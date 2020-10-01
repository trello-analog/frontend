import { useContext } from "react";
import { AppContext } from "../app";
import { transport } from "../services";
import { useAuth } from "./useAuth";

export function useLogin(): {
    login: () => void;
} {
    const context = useContext(AppContext);
    const { login } = useAuth();

    const handleLogin = () => {
        const token = transport.getToken();
        if (token) {
            transport.setToken(token);
            login().then((response) => {
                context.setUser(response);
            });
        }
    };

    return { login: handleLogin };
}
