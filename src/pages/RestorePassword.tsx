import React, { useState } from "react";
import { Page, Button, PublicRouteLayout, CustomForm } from "../components";
import { Alert, Form, Input } from "antd";
import { useAuth } from "../hooks";
import { IServerError } from "../entity";
import { useParams } from "react-router";

const RestorePassword = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const { code } = useParams();
    const { restorePassword } = useAuth();

    const onSubmit = (data: { newPassword: string; repeatNewPassword: string }) => {
        restorePassword({
            ...data,
            code: String(code),
        })
            .then(() => setSuccess(true))
            .catch((e: IServerError) => setError(e.message));
    };

    return (
        <Page title={"Восстановление пароля"}>
            <PublicRouteLayout>
                <CustomForm
                    onSubmit={onSubmit}
                    formProps={{
                        layout: "vertical",
                    }}
                >
                    <Form.Item
                        name={"newPassword"}
                        label={"Пароль"}
                        rules={[{ type: "string", min: 6, max: 100, required: true }]}
                    >
                        <Input.Password placeholder={"Пароль"} />
                    </Form.Item>
                    <Form.Item
                        name={"repeatNewPassword"}
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
                </CustomForm>
                {success && <Alert message={"Пароль успешно изменен!"} type={"success"} />}
                {error && <Alert message={error} type={"error"} />}
            </PublicRouteLayout>
        </Page>
    );
};

export default RestorePassword;
