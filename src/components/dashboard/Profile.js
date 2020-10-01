import React, {useContext, useState} from "react";
import styles from "./Dashboard.module.css";
import {UserContext} from "../../context/UserContext";

export const Profile = () => {

    const {loggedIn, setLoggedIn} = useContext(UserContext);
    const [changeState, setChangeState] = useState({changed: false})

    const submitHandler = (e) => {
        e.preventDefault()
        console.log("lo")
    }

    const inputHandler = (e) => {
        setChangeState({changed: true});
    }

    return (
        <div className={styles.dashMain}>
            <form onSubmit={submitHandler}>
                <div className={styles.formHeadingDiv}>
                    <h2>Profile Setting</h2>
                    <button className={changeState.changed ? "" : "muted-button"} type='submit' disabled={!changeState.changed}>Save</button>
                </div>
                <label htmlFor="image">
                    Profile Image
                    <input onChange={inputHandler} type="text" name='title' required placeholder={'Link with "http://" for image'} value={loggedIn.user.image}/>
                </label>
                <label htmlFor="username">
                    username
                    <input onChange={inputHandler} type="text" name='username' required value={loggedIn.user.username}/>
                </label>
                <label htmlFor="email">
                    Email
                    <input onChange={inputHandler} type='email' name='email' required value={loggedIn.user.email}/>
                </label>
                <label htmlFor="bio">
                    Bio
                    <input onChange={inputHandler} type='text' name='bio' required value={loggedIn.user.bio}/>
                </label>
            </form>
        </div>
    )
}