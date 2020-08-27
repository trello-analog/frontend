import React from "react";
import { Form, Input } from "antd";
import { css } from "emotion";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import { Page, PublicRouteLayout, Button } from "../components";

const styles = {
    actions: css`
        display: flex;
    `,
    right: css`
        margin-left: auto;
    `,
};

const validateMessages = {
    required: "${label} обязателен для заполнения",
    types: {
        email: "Невалидный e-mail",
    },
};

export const ForgotPassword = () => {
    return (
        <Page title={"Восстановление пароля"}>
            <PublicRouteLayout>
                <Form validateMessages={validateMessages} onFinish={console.log} layout="vertical">
                    <Typography.Text>
                        Введите e-mail аккаунта, к которому вы хотите получить доступ
                    </Typography.Text>
                    <Form.Item name={"email"} label={"Email"} rules={[{ required: true }]}>
                        <Input placeholder={"Email"} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" fullWidth>
                            Отправить
                        </Button>
                    </Form.Item>
                    <div className={styles.actions}>
                        <Link to={"/registration"}>Регистрация</Link>
                        <Link className={styles.right} to={"/login"}>
                            Войти
                        </Link>
                    </div>
                </Form>
            </PublicRouteLayout>
        </Page>
    );
};
