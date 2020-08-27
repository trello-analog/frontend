import React from "react";
import { Page, Button, PublicRouteLayout } from "../components";
import { Form, Input } from "antd";

const RestorePassword = () => {
    return (
        <Page title={"Восстановление пароля"}>
            <PublicRouteLayout>
                <Form layout="vertical">
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit" fullWidth>
                            Войти
                        </Button>
                    </Form.Item>
                </Form>
            </PublicRouteLayout>
        </Page>
    );
};

export default RestorePassword;
