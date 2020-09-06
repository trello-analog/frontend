import React, { createContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { IConfig, IUser } from "../entity";
import {
    LoadableForgotPassword,
    LoadableLogin,
    LoadableRegistration,
    LoadableRestorePassword,
} from "./AsyncRoutes";
import { IAppContext } from "../entity/context";
import useModal from "antd/es/modal/useModal";
import { transport } from "../services";

const config: IConfig = require("../config/config.json");
transport.init(config.serverUrl);

export const AppContext = createContext<IAppContext>({
    auth: false,
    setUser(user: IUser) {
        return;
    },
});

export const App = () => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState<IUser | undefined>(undefined);
    const [modal, contextHolder] = useModal();

    useEffect(() => {
        setAuth(!!user);
    }, [user]);

    return (
        <AppContext.Provider value={{ auth, user, setUser, modal }}>
            <Switch>
                <Route path={"/login"} exact>
                    <LoadableLogin />
                </Route>
                <Route path={"/forgot-password"} exact>
                    <LoadableForgotPassword />
                </Route>
                <Route path={"/registration"} exact>
                    <LoadableRegistration />
                </Route>
                <Route path={"/restore-password/:code"} exact>
                    <LoadableRestorePassword />
                </Route>
            </Switch>
            {contextHolder}
        </AppContext.Provider>
    );
};
