import {
    ICreateUserRequest,
    IId,
    IRestorePasswordRequest,
    ISendTwoAuthCodeRequest,
    ISignInRequest,
    ISignInTwoAuth,
    ITokenResponse,
    IUser,
} from "../entity";
import { AuthAPI } from "../api";

export function useAuth(): {
    signUp: (data: ICreateUserRequest) => Promise<IId>;
    signIn: (data: ISignInRequest) => Promise<ITokenResponse | ISignInTwoAuth>;
    login: () => Promise<IUser>;
    forgotPassword: (email: string) => Promise<undefined>;
    sendTwoAuthCode: (data: ISendTwoAuthCodeRequest) => Promise<ITokenResponse>;
    restorePassword: (data: IRestorePasswordRequest) => Promise<undefined>;
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
