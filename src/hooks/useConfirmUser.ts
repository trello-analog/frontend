import { useState } from "react";
import { AuthAPI } from "../api";
import { IServerError } from "../entity";

export function useConfirmUser(
    code: string,
    email: string,
): {
    status: "success" | "error" | undefined;
    error: string | undefined;
    resendEnable: boolean;

    confirmUser: () => Promise<void>;

    resendConfirm: () => Promise<void>;
} {
    const [status, setStatus] = useState<"success" | "error" | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);
    const [resendEnable, setResendEnable] = useState(false);

    const confirm = () => {
        return AuthAPI.confirmUser({ code, email })
            .then(() => {
                setError(undefined);
                setStatus("success");
            })
            .catch((e: IServerError) => {
                setStatus("error");
                setError(e.message);
                if (e.code === 8) {
                    setResendEnable(true);
                }
            });
    };

    const resend = () => {
        return AuthAPI.resendConfirmMessage(email);
    };

    return { status, error, confirmUser: confirm, resendConfirm: resend, resendEnable };
}
