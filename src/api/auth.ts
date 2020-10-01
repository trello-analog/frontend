import { transport } from "../services";
import {
    IConfirmUserRequest,
    IConfirmUserResponse,
    ICreateUserRequest,
    ICreateUserResponse,
    IRestorePasswordRequest,
    ISendTwoAuthCodeRequest,
    ISignInRequest,
    ISignInTwoAuth,
    ITokenResponse,
    IUser,
} from "../entity";

export function signUp(data: ICreateUserRequest) {
    return transport.post<ICreateUserResponse, ICreateUserRequest>("/auth/sign-up", data);
}

export function signIn(data: ISignInRequest) {
    return transport.post<ITokenResponse | ISignInTwoAuth, ISignInRequest>("/auth/sign-in", data);
}

export function login() {
    return transport.post<IUser, undefined>("/auth/login", undefined);
}

export function send2AuthCode(data: ISendTwoAuthCodeRequest) {
    return transport.post<ITokenResponse, ISendTwoAuthCodeRequest>("/auth/two-auth", data);
}

export function resend2AuthCode(userId: number) {
    return transport.post<ISignInTwoAuth, { userId: number }>("/auth/resend-two-auth", { userId });
}

export function sendRestoringEmail(email: string) {
    return transport.post<undefined, { email: string }>("/auth/forgot-password", { email });
}

export function restorePassword(data: IRestorePasswordRequest) {
    return transport.post<undefined, IRestorePasswordRequest>("/auth/restore-password", data);
}

export function resendTwoAuthCode(checkCode: string) {
    return transport.post<ISignInTwoAuth, { checkCode: string }>("/auth/resend-two-auth", {
        checkCode,
    });
}

export function confirmUser(data: IConfirmUserRequest) {
    return transport.post<IConfirmUserResponse, IConfirmUserRequest>("/auth/confirm", data);
}

export function resendConfirmMessage(email: string) {
    return transport.post<undefined, { email: string }>("/auth/resend-confirm", { email });
}

export function checkCode(code: string) {
    return transport.get<IConfirmUserResponse>(`/auth/restore-password/${code}`);
}
