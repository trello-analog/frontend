import { AxiosError, AxiosResponse } from "axios";
import { IServerError, IErrorResponse } from "../entity";

export function getServerError(error: AxiosError): IServerError | undefined {
    const response = error.response as AxiosResponse<IErrorResponse>;
    if (!response) {
        return undefined;
    }
    return response.data.error;
}
