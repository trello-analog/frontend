import React from "react";
import { Route, Switch } from "react-router";
import { Login } from "../pages";
import { ForgotPassword } from "../pages/ForgotPassword";

export const App = () => {
    return (
        <Switch>
            <Route path={"/login"} exact>
                <Login />
            </Route>
            <Route path={"/forgot-password"} exact>
                <ForgotPassword />
            </Route>
        </Switch>
    );
};
