import React from "react";
import { Route, Switch } from "react-router";
import { IConfig } from "../entity";
import { transport } from "../services";
import {
    LoadableForgotPassword,
    LoadableLogin,
    LoadableRegistration,
    LoadableRestorePassword,
} from "./AsyncRoutes";

const config: IConfig = require("../config/config.json");
transport.init(config.serverUrl);

export const App = () => {
    return (
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
    );
};
