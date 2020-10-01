import React, { useEffect, useState } from "react";
import { css, cx } from "emotion";
import { Alert, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import { PublicRouteLayout, Page, Button, CustomForm } from "../components";
import { useSignIn } from "../hooks";
import { Popup } from "../components/Popup";
import ReactCodeInput from "react-code-input";

const { Text } = Typography;

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
    resendButton: css`
        width: 100%;
        margin-top: 20px;
    `,
    disabledButton: css`
        color: black !important;
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
    const { error, signIn, closeModal, sendTwoAuth, expired, modal, resendTwoAuth } = useSignIn();
    const [code, setCode] = useState("");

    useEffect(() => {
        if (!modal) {
            console.log("reset");
            setCode("");
        }
    }, [modal]);

    const submitTwoAuth = () => {
        sendTwoAuth(code);
    };

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
                    <Form.Item name={"name"} label={"Email или логин"} rules={[{ required: true }]}>
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
                {error && !modal && (
                    <Alert message={error} type={"error"}>
                        {error}
                    </Alert>
                )}
            </PublicRouteLayout>
            {modal && (
                <Popup
                    visible={modal}
                    title={"Введите код для двухфакторной аутентификации"}
                    onClose={closeModal}
                    onSubmit={submitTwoAuth}
                >
                    <Text>На ваш e-mail отправлено письмо с кодом</Text>
                    <ReactCodeInput
                        className={css`
                            display: grid !important;
                            grid-template-columns: repeat(4, 1fr);
                        `}
                        inputMode={"numeric"}
                        inputStyle={{
                            fontFamily: "monospace",
                            borderRadius: 6,
                            border: "1px solid lightgrey",
                            boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 10px 0px",
                            margin: 4,
                            paddingLeft: 8,
                            width: 36,
                            height: 42,
                            fontSize: 32,
                            boxSizing: "border-box",
                            color: "black",
                            backgroundColor: "white",
                        }}
                        name={"code"}
                        value={code}
                        onChange={(e) => setCode(e)}
                    />
                    <Button
                        type={"primary"}
                        className={cx(styles.resendButton, expired !== 0 && styles.disabledButton)}
                        disabled={expired !== 0}
                        onClick={resendTwoAuth}
                    >
                        {expired === 0 ? (
                            "Выслать код заново"
                        ) : (
                            <>
                                Выслать код заново можно будет через <b>{expired}</b> секунд
                            </>
                        )}
                    </Button>
                    {error && modal && (
                        <Alert
                            message={error}
                            type={"error"}
                            className={css`
                                margin-top: 20px;
                            `}
                        >
                            {error}
                        </Alert>
                    )}
                </Popup>
            )}
        </Page>
    );
};

export default Login;
