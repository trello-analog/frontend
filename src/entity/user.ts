import { IId } from "./common";
import { IToken } from "./token";

export interface ICreateUserRequest {
    email: string;
    login: string;
    password: string;
    twoAuth?: boolean;
}

export type ICreateUserResponse = IId;

export interface ISignInRequest {
    name: string;
    password: string;
}

export interface IUser extends IId {
    login: string;
    email: string;
    avatar?: string;
    roles: IUserRole[];
}

export interface IUserRole extends IId {
    name: string;
}

export interface IRestorePasswordRequest {
    code: string;
    newPassword: string;
    repeatNewPassword: string;
}

export interface ITokenResponse {
    token: IToken;
}

export interface ISignInTwoAuth {
    userId: number;
    expired: number;
}

export interface ISendTwoAuthCodeRequest {
    userId: number;
    code: string;
}

export interface IConfirmUserRequest {
    code: string;
    email: string;
}

export type TConfirmUserStatus = "success" | "info" | "error";

export interface IConfirmUserResponse {
    status: TConfirmUserStatus;
    message: string;
}
