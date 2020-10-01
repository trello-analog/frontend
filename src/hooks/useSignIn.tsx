import { IServerError, ISignInRequest, ISignInTwoAuth, ITokenResponse } from "../entity";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useHistory } from "react-router";
import { transport } from "../services";
import { AppContext } from "../app";
import { AuthAPI } from "../api";

export function useSignIn(): {
    error: string | undefined;
    signIn: (data: ISignInRequest) => Promise<void>;
    modal: boolean;
    expired: number;
    sendTwoAuth: (code: string) => void;
    closeModal: () => void;
    resendTwoAuth: () => Promise<void>;
} {
    const [error, setError] = useState<string | undefined>(undefined);
    const [userId, setUserId] = useState<number | undefined>(undefined);
    const { signIn: signInHandler, login, sendTwoAuthCode } = useAuth();
    const history = useHistory();
    const context = useContext(AppContext);
    const [expired, setExpired] = useState(0);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        let interval: any;
        if (expired && expired >= 0) {
            interval = setTimeout(() => {
                setExpired((expired) => expired - 1);
            }, 1000);

            if (expired === 0 || !modal) {
                clearInterval(interval);
            }
        }

        return () => clearTimeout(interval);
    });

    const sendTwoAuth = (code: string) => {
        setError(undefined);
        if (userId) {
            sendTwoAuthCode({
                code,
                userId,
            })
                .then((response) => {
                    console.log(response);
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
        setError(undefined);
        return signInHandler(data)
            .then((response) => {
                if ((response as ITokenResponse).token) {
                    transport
                        .setToken((response as ITokenResponse).token)
                        .then(() => {
                            login().then((user) => {
                                context.setUser(user);
                                history.push("/dashboards");
                            });
                        })
                        .catch((e: IServerError) => {
                            setError(e.message);
                        });
                }
                if ((response as ISignInTwoAuth).userId) {
                    setModal(true);
                    setUserId((response as ISignInTwoAuth).userId);
                    const exp = (response as ISignInTwoAuth).expired;
                    setExpired(exp);
                }
            })
            .catch((e: IServerError) => {
                setError(e.message);
            });
    };

    const closeModal = () => setModal(false);

    const resendTwoAuth = () => {
        return AuthAPI.resend2AuthCode(Number(userId))
            .then((response) => setExpired(response.expired))
            .catch((e: IServerError) => {
                setError(e.message);
            });
    };

    return { error, signIn, modal, expired, sendTwoAuth, closeModal, resendTwoAuth };
}
