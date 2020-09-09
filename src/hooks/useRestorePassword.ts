import { IConfirmUserResponse, IServerError } from "../entity";
import { useEffect, useState } from "react";
import { AuthAPI } from "../api";

export function useRestorePassword(
    code: string,
): {
    response: IConfirmUserResponse | undefined;

    restorePassword: (data: { newPassword: string; repeatNewPassword: string }) => Promise<void>;
} {
    const [response, setResponse] = useState<IConfirmUserResponse | undefined>(undefined);

    const check = () => {
        return AuthAPI.checkCode(code)
            .then((result) => setResponse(result))
            .catch((e: IServerError) => {
                setResponse({
                    status: "error",
                    message: e.message,
                });
            });
    };

    const restore = (data: { newPassword: string; repeatNewPassword: string }) => {
        return AuthAPI.restorePassword({ ...data, code });
    };

    useEffect(() => {
        check();
    }, []);

    return { response, restorePassword: restore };
}
