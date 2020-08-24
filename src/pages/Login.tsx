import React from "react";
import { css } from "emotion";
import { Button, Form, Input } from "antd";
import { Logo } from "../components/Logo";
import { Link } from "react-router-dom";

const styles = {
    container: css`
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    `,
    form: css`
        width: 400px;
        display: grid;
        grid-template-columns: 1fr;
        grid-row-gap: 20px;
    `,
    logo: css`
        display: flex;
        justify-content: center;
        text-decoration: none;
        color: #000;
    `,
    button: css`
        width: 100%;
    `,
    actions: css`
        display: flex;
    `,
    forgot: css`
        margin-left: auto;
    `,
};

const validateMessages = {
    required: "${label} обязательно для заполнения",
    string: {
        range: "Длина поля ${label} должна быть не менее 6 и не более 100 символов",
    },
};

export const Login = () => {
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <Link to={"/"} className={styles.logo}>
                    <Logo />
                </Link>
                <Form validateMessages={validateMessages} onFinish={console.log} layout="vertical">
                    <Form.Item
                        name={"login"}
                        label={"Email или логин"}
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={"password"}
                        label={"Пароль"}
                        rules={[{ type: "string", min: 6, max: 100, required: true }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className={styles.button}>
                            Войти
                        </Button>
                    </Form.Item>
                    <div className={styles.actions}>
                        <Link to={"/registration"}>Регистрация</Link>
                        <Link className={styles.forgot} to={"/forgot-password"}>
                            Забыл пароль
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};
