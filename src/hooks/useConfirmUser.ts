import { useState } from "react";
import { AuthAPI } from "../api";
import { IConfirmUserResponse, IServerError } from "../entity";

export function useConfirmUser(
    code: string,
    email: string,
): {
    response: IConfirmUserResponse | undefined;

    confirmUser: () => Promise<void>;

    resendConfirm: () => Promise<void>;
} {
    const [response, setResponse] = useState<IConfirmUserResponse | undefined>(undefined);

    const confirm = () => {
        return AuthAPI.confirmUser({ code, email })
            .then((response) => {
                setResponse(response);
            })
            .catch((e: IServerError) => {
                setResponse({
                    status: "error",
                    message: e.message,
                });
            });
    };

    const resend = () => {
        return AuthAPI.resendConfirmMessage(email);
    };

    return { response, confirmUser: confirm, resendConfirm: resend };
}
