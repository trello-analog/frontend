import { IId } from "./common";

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
}
