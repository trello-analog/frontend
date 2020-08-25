import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { IResponse, IToken } from "../entity";

export class HttpTransport {
    private client: AxiosInstance = axios.create();
    private token?: IToken;
    private readonly handlers: Array<(error?: Error) => void> = [];

    public init(serverUrl: string): void {
        this.client = axios.create({
            baseURL: serverUrl,
        });
    }

    public subscribe(handler: (error?: Error) => void): void {
        this.handlers.push(handler);
    }

    public setToken(token: IToken): void {
        this.token = token;
        localStorage.setItem("token", JSON.stringify(token));
    }

    public clearToken(): void {
        this.token = undefined;
        localStorage.removeItem("token");
    }

    public get<R>(url: string, params?: object): Promise<R> {
        return new Promise<R>((resolve, reject) => {
            this.client
                .get(url, this.config(params))
                .then((response: AxiosResponse<IResponse<R>>) => {
                    return resolve(response.data.data);
                })
                .catch((error) => {
                    reject(error);
                    this.handlers.forEach((handler) => handler(error));
                });
        });
    }

    public put<R, B>(url: string, body: B, params?: object): Promise<R> {
        return new Promise<R>((resolve, reject) => {
            this.client
                .put(url, { ...body }, this.config(params))
                .then((response: AxiosResponse<IResponse<R>>) => {
                    return resolve(response.data.data);
                })
                .catch((error) => {
                    reject(error);
                    this.handlers.forEach((handler) => handler(error));
                });
        });
    }

    public post<R, B>(url: string, body: B, params?: object): Promise<R> {
        return new Promise<R>((resolve, reject) => {
            this.client
                .post(url, { ...body }, this.config(params))
                .then((response: AxiosResponse<IResponse<R>>) => {
                    return resolve(response.data.data);
                })
                .catch((error) => {
                    reject(error);
                    this.handlers.forEach((handler) => handler(error));
                });
        });
    }

    async delete<Response = void>(url: string, params?: object): Promise<Response> {
        return new Promise<Response>((resolve, reject) => {
            this.client
                .delete(url, this.config(params))
                .then((response) => {
                    return resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                    this.handlers.forEach((handler) => handler(error));
                });
        });
    }

    private config(params?: object): Pick<AxiosRequestConfig, "params" | "headers"> {
        return {
            headers: {
                "access-token": this.token?.accessToken,
                "refresh-token": this.token?.refreshToken,
            },
            ...params,
        };
    }
}

export const transport = new HttpTransport();
