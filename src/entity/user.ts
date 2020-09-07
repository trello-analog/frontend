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
    email: string;
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
    checkCode: string;
    expired: string;
}

export interface ISendTwoAuthCodeRequest {
    checkCode: string;
    code: string;
}

export interface IConfirmUserRequest {
    code: string;
    email: string;
}
