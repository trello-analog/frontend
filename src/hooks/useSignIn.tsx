import { IServerError, ISignInRequest, ISignInTwoAuth, ITokenResponse } from "../entity";
import React, { useContext, useState } from "react";
import { useAuth } from "./useAuth";
import { useHistory } from "react-router";
import { transport } from "../services";
import { AppContext } from "../app";
import { Input } from "antd";
import { Typography } from "antd";

const { Text } = Typography;

export function useSignIn(): {
    error: string | undefined;
    signIn: (data: ISignInRequest) => Promise<void>;
} {
    const [error, setError] = useState<string | undefined>(undefined);
    const [checkCode, setCheckCode] = useState<string | undefined>(undefined);
    const { signIn: signInHandler, login, sendTwoAuthCode } = useAuth();
    const history = useHistory();
    const context = useContext(AppContext);
    const [code, setCode] = useState("");

    const modalContent = (
        <AppContext.Consumer
            children={() => (
                <>
                    <Text>На ваш e-mail отправлено письмо с кодом</Text>
                    <Input
                        placeholder={"Код"}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </>
            )}
        />
    );

    const sendTwoAuth = () => {
        if (checkCode) {
            sendTwoAuthCode({
                code,
                checkCode,
            })
                .then((response) => {
                    transport
                        .setToken(response.token)
                        .then(() => {
                            login().then((user) => {
                                context.setUser(user);
                                history.push("/dashboards");
                            });
                        })
                        .catch((e: IServerError) => setError(e.message));
                })
                .catch((e: IServerError) => setError(e.message));
        }
    };

    const signIn = (data: ISignInRequest) => {
        return signInHandler(data).then((response) => {
            if ((response as ITokenResponse).token) {
                transport
                    .setToken((response as ITokenResponse).token)
                    .then(() => {
                        login().then((user) => {
                            context.setUser(user);
                            history.push("/dashboards");
                        });
                    })
                    .catch((e: IServerError) => setError(e.message));
            }
            if ((response as ISignInTwoAuth).checkCode) {
                setCheckCode((response as ISignInTwoAuth).checkCode);
                context.modal?.confirm({
                    title: "Введите код для двухфакторной аутентификации",
                    content: modalContent,
                    cancelText: "Отмена",
                    visible: true,
                    onOk: sendTwoAuth,
                });
            }
        });
    };

    return { error, signIn };
}
