import React from "react";
import { Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { PublicRouteLayout, Page, Button } from "../components";
import { css } from "emotion";

const styles = {
    actions: css`
        display: flex;
    `,
    right: css`
        margin-left: auto;
    `,
};

const validateMessages = {
    required: "${label} обязательно для заполнения",
    types: {
        email: "Невалидный e-mail",
    },
    string: {
        range: "Длина поля ${label} должна быть не менее 6 и не более 100 символов",
    },
};

export const Registration = () => {
    return (
        <Page title={"Регистрация"}>
            <PublicRouteLayout>
                <Form
                    validateMessages={validateMessages}
                    onFinish={console.log}
                    layout="vertical"
                    initialValues={{ twoAuth: false }}
                >
                    <Form.Item
                        name={"email"}
                        label={"Email"}
                        rules={[{ required: true, type: "email" }]}
                    >
                        <Input placeholder={"Email"} />
                    </Form.Item>
                    <Form.Item name={"login"} label={"Login"} rules={[{ required: true }]}>
                        <Input placeholder={"Логин"} />
                    </Form.Item>
                    <Form.Item
                        name={"password"}
                        label={"Пароль"}
                        rules={[{ type: "string", min: 6, max: 100, required: true }]}
                    >
                        <Input.Password placeholder={"Пароль"} />
                    </Form.Item>
                    <Form.Item
                        name={"repeatPassword"}
                        label={"Повтор пароля"}
                        rules={[
                            { min: 6, max: 100, required: true },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        "Поля 'Пароли' и 'Повтор пароля' должны совпадать!",
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder={"Повтор пароля"} />
                    </Form.Item>
                    <Form.Item name={"twoAuth"} valuePropName={"checked"}>
                        <Checkbox>Двухфакторная аутентификация</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" fullWidth>
                            Войти
                        </Button>
                    </Form.Item>
                    <div className={styles.actions}>
                        <Link to={"/forgot-password"}>Не помню пароль</Link>
                        <Link className={styles.right} to={"/login"}>
                            Войти
                        </Link>
                    </div>
                </Form>
            </PublicRouteLayout>
        </Page>
    );
};
