import React from "react";
import { css } from "emotion";
import { Alert, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { PublicRouteLayout, Page, Button, CustomForm } from "../components";
import { useSignIn } from "../hooks";

const styles = {
    actions: css`
        display: flex;
    `,
    right: css`
        margin-left: auto;
    `,
    popupContent: css`
        display: grid;
        grid-row-gap: 20px;
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

const Login = () => {
    const { error, signIn } = useSignIn();

    return (
        <Page title={"Войти"}>
            <PublicRouteLayout>
                <CustomForm
                    onSubmit={signIn}
                    formProps={{
                        validateMessages,
                        layout: "vertical",
                    }}
                >
                    <Form.Item
                        name={"login"}
                        label={"Email или логин"}
                        rules={[{ required: true }]}
                    >
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
                        <Button type="primary" htmlType="submit" fullWidth>
                            Войти
                        </Button>
                    </Form.Item>
                    <div className={styles.actions}>
                        <Link to={"/registration"}>Регистрация</Link>
                        <Link className={styles.right} to={"/forgot-password"}>
                            Не помню пароль
                        </Link>
                    </div>
                </CustomForm>
                {error && (
                    <Alert message={error} type={"error"}>
                        {error}
                    </Alert>
                )}
            </PublicRouteLayout>
        </Page>
    );
};

export default Login;
