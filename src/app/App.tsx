import React from "react";
import { Route, Switch } from "react-router";
import { Login, ForgotPassword, Registration, RestorePassword } from "../pages";
import { IConfig } from "../entity";
import { transport } from "../services";

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
            <Route path={"/restore-password/:code"} exact>
                <RestorePassword />
            </Route>
        </Switch>
    );
};
