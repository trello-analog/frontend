export interface IResponse<T = any> {
    success: boolean;
    data: T;
}

export interface IServerError {
    status: number;
    code: number;
    message: string;
}

export interface IErrorResponse {
    success: boolean;
    error: IServerError;
}
