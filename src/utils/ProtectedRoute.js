import React, {useContext} from "react";
import {Redirect, Route} from "react-router";
import {UserContext} from "../context/UserContext";

export const ProtectedRoute = ({path, component}) => {

    const {loggedIn} = useContext(UserContext)

    return (
        <>
            <Route path={path} >{loggedIn.loggedIn ? component : <Redirect to={'/login'}/>}</Route>
        </>
    )

}