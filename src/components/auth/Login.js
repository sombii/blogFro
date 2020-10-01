import React, {useContext, useEffect, useState} from "react";
import styles from './Login.module.css'
import {login} from "../../services/request";
import {Link,useHistory} from "react-router-dom";
import {UserContext} from "../../context/UserContext";


export const Login = () => {

    const {loggedIn, setLoggedIn} = useContext(UserContext);

    const [credential, setCredential] = useState({email: '', password: ''});
    const [submit, setSubmit] = useState(false);
    const [invalidCredential, setInvalidCredential] = useState(false);
    const history = useHistory();

    useEffect(() => {

        console.log(loggedIn)
        if (loggedIn.loggedIn)
            history.push('/dashboard')
    }, [loggedIn]);

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setCredential({...credential, [name]: value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setInvalidCredential(false);
        setSubmit(true);
        const request = {user: {...credential}};

        login(request).then(data => {
            // console.log(data)
            if (data.hasOwnProperty("user")) {
                localStorage.setItem("loginDetails", JSON.stringify(
                    data));
                setLoggedIn({loggedIn: true, checked: true,user: {...data.user}});
                history.push('/dashboard')
            } else if (data.hasOwnProperty("errors")) {
                setInvalidCredential(true);
                setSubmit(false);
            } else {
                setSubmit(false);
                console.log(JSON.stringify(data))
            }
        });


    }

    return (
        <form onSubmit={submitHandler} className={styles.loginForm}>
            <h2>User Login</h2>
            <small>{invalidCredential && "Username or Password Invalid, try again."}</small>
            <label htmlFor="email">
                Email
                <input onChange={inputHandler} type="email" name="email" id="email" required/>
            </label>
            <label htmlFor="password">
                Password
                <input onChange={inputHandler} type="password" name="password" id="password" required/>
            </label>
            <button type='submit' disabled={submit}>{submit ? 'Please wait' : 'Login'}</button>
            <div>
                <Link to={'/register'}>No account ? SignUp here</Link>
            </div>
        </form>
    )
}