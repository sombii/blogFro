import React, {useContext} from "react";
import {UserContext} from "../context/UserContext";

const About = () => {

    const {loggedIn} = useContext(UserContext);

    return (
        <div>
            <p>about</p>
            <p>user is {loggedIn ? "logged in" : "not logged ini"}</p>
        </div>
    )
}

export default About;