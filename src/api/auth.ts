import { transport } from "../services/Transport";
import {
    ICreateUserRequest,
    ICreateUserResponse,
    IResponse,
    ISignInRequest,
    IToken,
    IUser,
} from "../entity";

export function signUp(data: ICreateUserRequest) {
    return transport.post<ICreateUserResponse, ICreateUserRequest>("/auth/sign-up", data);
}

export function signIn(data: ISignInRequest) {
    return transport.post<IToken, ISignInRequest>("/auth/sign-in", data);
}

export function login() {
    return transport.post<IUser, undefined>("/auth/login", undefined);
}

export function send2AuthCode(code: string) {
    return transport.post<IToken, { code: string }>("/auth/twoAuth", { code });
}

export function forgotPassword(email: string) {
    return transport.post<IResponse, { email: string }>("/auth/forgot-password", { email });
}
