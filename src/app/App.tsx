import React from "react";
import { Route, Switch } from "react-router";
import { Login } from "../pages";
import { ForgotPassword } from "../pages/ForgotPassword";
import { Registration } from "../pages/Registration";
import { IConfig } from "../entity";
import { transport } from "../services/Transport";

const config: IConfig = require("../config/config.json");
transport.init(config.serverUrl);

export const App = () => {
    return (
        <Switch>
            <Route path={"/login"} exact>
                <Login />
            </Route>
            <Route path={"/forgot-password"} exact>
                <ForgotPassword />
            </Route>
            <Route path={"/registration"} exact>
                <Registration />
            </Route>
        </Switch>
    );
};
