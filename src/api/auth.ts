import { transport } from "../services";
import {
    ICreateUserRequest,
    ICreateUserResponse,
    IResponse,
    IRestorePasswordRequest,
    ISendTwoAuthCodeRequest,
    ISignInRequest,
    ISignInTwoAuth,
    IToken,
    IUser,
} from "../entity";

export function signUp(data: ICreateUserRequest) {
    return transport.post<ICreateUserResponse, ICreateUserRequest>("/auth/sign-up", data);
}

export function signIn(data: ISignInRequest) {
    return transport.post<IToken | IResponse<ISignInTwoAuth>, ISignInRequest>(
        "/auth/sign-in",
        data,
    );
}

export function login() {
    return transport.post<IUser, undefined>("/auth/login", undefined);
}

export function send2AuthCode(data: ISendTwoAuthCodeRequest) {
    return transport.post<IToken, { code: string }>("/auth/two-auth", data);
}

export function sendRestoringEmail(email: string) {
    return transport.post<IResponse, { email: string }>("/auth/forgot-password", { email });
}

export function restorePassword(data: IRestorePasswordRequest) {
    return transport.post<IResponse, IRestorePasswordRequest>("/auth/restore-password", data);
}
