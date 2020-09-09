import React, { useState } from "react";
import { Alert, Form, Input } from "antd";
import { css } from "emotion";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import { Page, PublicRouteLayout, Button, CustomForm } from "../components";
import { useAuth } from "../hooks";
import { IServerError } from "../entity";

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

const ForgotPassword = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<undefined | string>(undefined);
    const { forgotPassword } = useAuth();

    const onSubmit = (data: { email: string }) => {
        setSuccess(false);
        setError(undefined);
        forgotPassword(data.email)
            .then(() => {
                setSuccess(true);
                setError(undefined);
            })
            .catch((e: IServerError) => {
                setError(e.message);
                setSuccess(false);
            });
    };

    return (
        <Page title={"Восстановление пароля"}>
            <PublicRouteLayout>
                <CustomForm
                    onSubmit={onSubmit}
                    formProps={{
                        validateMessages,
                        layout: "vertical",
                    }}
                >
                    <Typography.Text>
                        Введите e-mail аккаунта, к которому вы хотите получить доступ
                    </Typography.Text>
                    <Form.Item
                        name={"email"}
                        label={"Email"}
                        rules={[{ required: true, type: "email" }]}
                    >
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
                </CustomForm>
                {success && (
                    <Alert
                        message={"Инструкции по восстановлению пароля отправлены вам на e-mail"}
                        type={"success"}
                    />
                )}
                {error && <Alert message={error} type={"error"} />}
            </PublicRouteLayout>
        </Page>
    );
};

export default ForgotPassword;
