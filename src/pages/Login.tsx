import React from "react";
import { css } from "emotion";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { PublicRouteLayout } from "../components/PublicRouteLayout";

const styles = {
    button: css`
        width: 100%;
    `,
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

export const Login = () => {
    return (
        <PublicRouteLayout>
            <Form validateMessages={validateMessages} onFinish={console.log} layout="vertical">
                <Form.Item name={"login"} label={"Email или логин"} rules={[{ required: true }]}>
                    <Input placeholder={"Логин или email"} />
                </Form.Item>
                <Form.Item
                    name={"password"}
                    label={"Пароль"}
                    rules={[{ type: "string", min: 6, max: 100, required: true }]}
                >
                    <Input.Password placeholder={"Пароль"} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.button}>
                        Войти
                    </Button>
                </Form.Item>
                <div className={styles.actions}>
                    <Link to={"/registration"}>Регистрация</Link>
                    <Link className={styles.right} to={"/forgot-password"}>
                        Не помню пароль
                    </Link>
                </div>
            </Form>
        </PublicRouteLayout>
    );
};
