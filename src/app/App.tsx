import React from 'react';
import { Route, Switch } from "react-router";
import { Login } from "../pages";

export const App = () => {
    return (
        <Switch>
            <Route path={"/login"} exact>
                <Login />
            </Route>
        </Switch>
    )
}
