import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserContext";
import styles from "./Login.module.css";
import {Link, useHistory} from "react-router-dom";
import {register} from "../../services/request";

const Register = () => {

    const {loggedIn, setLoggedIn} = useContext(UserContext);

    const [submit, setSubmit] = useState(false);
    const [request, setRequest] = useState({})
    const [regError, setRegError] = useState({errors: {}, error: false})

    const history = useHistory();

    useEffect(() => {
        if (loggedIn.loggedIn)
            history.push('/dashboard')
    }, [loggedIn]);

    const inputHandler = (e) => {
        const {name, value} = e.target
        setRequest({...request, [name]: value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setSubmit(true);
        setRegError({errors: {}, error: false});
        let userRequest = {user: {...request}}
        register(userRequest).then(data => {
            if (data.hasOwnProperty("user")) {
                localStorage.setItem("loginDetails", JSON.stringify(
                    data));
                setLoggedIn({loggedIn: true, checked: true});
                history.push('/dashboard')
            } else if (data.hasOwnProperty("errors")) {
                setRegError({errors: data.errors, error: true})
                // setInvalidCredential(true);
                console.log(data)
                console.log(regError)
                setSubmit(false);
            } else {
                setSubmit(false);
                console.log(JSON.stringify(data))
            }

        })
    }

    return (
        <form onSubmit={submitHandler} className={styles.loginForm}>
            <h2>User Registration</h2>
            <label htmlFor="email">
                UserName
                <input onChange={inputHandler} type="text" name="username" id="username" required/>
            </label>
            {regError.errors.hasOwnProperty("username") && <small>{regError.errors.username}</small>}
            <label htmlFor="email">
                Email
                <input onChange={inputHandler} type="email" name="email" id="email" required/>
            </label>
            {regError.errors.hasOwnProperty("email") && <small>{regError.errors.email}</small>}
            <label htmlFor="password">
                Password
                <input onChange={inputHandler} type="password" name="password" id="password" required/>
            </label>
            {regError.errors.hasOwnProperty("password") && <small>{regError.errors.password}</small>}
            <button type='submit' disabled={submit}>{submit ? 'Please wait' : 'Submit'}</button>
        </form>
    )
}

export default Register;