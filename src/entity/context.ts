import { IUser } from "./user";
import { ModalStaticFunctions } from "antd/es/modal/confirm";

export interface IAppContext {
    auth: boolean;
    user?: IUser;
    modal?: Omit<ModalStaticFunctions, "warn">;

    setUser(user: IUser): void;
}
