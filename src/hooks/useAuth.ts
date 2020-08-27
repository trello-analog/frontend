import {
    ICreateUserRequest,
    IId,
    IResponse,
    IRestorePasswordRequest,
    ISendTwoAuthCodeRequest,
    ISignInRequest,
    ISignInTwoAuth,
    IToken,
    IUser,
} from "../entity";
import { AuthAPI } from "../api";

export function useAuth(): {
    signUp: (data: ICreateUserRequest) => Promise<IId>;
    signIn: (data: ISignInRequest) => Promise<IToken | IResponse<ISignInTwoAuth>>;
    login: () => Promise<IUser>;
    forgotPassword: (email: string) => Promise<IResponse>;
    sendTwoAuthCode: (data: ISendTwoAuthCodeRequest) => Promise<IToken>;
    restorePassword: (data: IRestorePasswordRequest) => Promise<IResponse>;
} {
    const signUp = (data: ICreateUserRequest) => {
        return AuthAPI.signUp(data);
    };

    const signIn = (data: ISignInRequest) => {
        return AuthAPI.signIn(data);
    };

    const login = () => {
        return AuthAPI.login();
    };

    const forgotPassword = (email: string) => {
        return AuthAPI.sendRestoringEmail(email);
    };

    const sendTwoAuthCode = (data: ISendTwoAuthCodeRequest) => {
        return AuthAPI.send2AuthCode(data);
    };

    const restorePassword = (data: IRestorePasswordRequest) => {
        return AuthAPI.restorePassword(data);
    };

    return { signUp, signIn, login, forgotPassword, sendTwoAuthCode, restorePassword };
}
