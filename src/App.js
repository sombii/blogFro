import React, {useEffect, useState} from 'react';
import './App.css';
import Nav from "./components/Nav";
import Home from "./components/Home";
import {Switch, Route} from 'react-router-dom'
import ArticleList from "./components/ArticleList";
import Register from "./components/auth/Register";
import MyFeed from "./components/MyFeed";
import Article from "./components/Article";
import {Login} from "./components/auth/Login";
import {DashBoard} from "./components/dashboard/Dashboard";
import {UserContext} from "./context/UserContext";
import {isLoggedIn} from "./services/request";
import {ProtectedRoute} from "./utils/ProtectedRoute";
// import {Redirect} from "react-router";

function App() {

    const [loggedIn, setLoggedIn] = useState({loggedIn: false, checked: false});

    useEffect(() => {
        const loginData = JSON.parse(localStorage.getItem('loginDetails'));

        if (loginData) {
            const reqHeader = {"Authorization": `Token ${loginData.user.token}`};

            isLoggedIn(reqHeader).then(data => {
                if (data.hasOwnProperty('error')) {
                    setLoggedIn({loggedIn: false, checked: true});
                } else {
                    if (data.status === 200) setLoggedIn({loggedIn: true, checked: true});
                    if (data.status === 401) {
                        setLoggedIn({loggedIn: false, checked: true});
                        localStorage.removeItem('loginDetails')
                    }
                }
            });
        } else {
            setLoggedIn({loggedIn: false, checked: true});
        }
    }, [])


    return (
        <UserContext.Provider value={{loggedIn, setLoggedIn}}>
            {loggedIn.checked
                ? <div className="container-fluid">
                    <Nav/>
                    <div className="container">
                        <Switch>
                            <Route path={'/'} exact>
                                <Home/>
                            </Route>
                            <Route path={'/articles'}>
                                <ArticleList/>
                            </Route>
                            <Route path={'/register'}>
                                <Register/>
                            </Route>
                            {/*<PRoute path={'/login'} component={Login}>*/}
                            <Route path={'/login'} component={Login}/>
                            {/*<Route path={'/dashboard'}>{loggedIn.loggedIn ? <DashBoard/> : <Redirect to={'/login'}/>}</Route>*/}
                            <ProtectedRoute path={'/feed'} component={MyFeed}/>
                            <ProtectedRoute path={'/dashboard'} component={DashBoard}/>
                            <Route path={'/:slug'} component={Article}/>
                            <Route component={NotFound}/>

                        </Switch>
                    </div>
                </div>
                : "loading"
            }
        </UserContext.Provider>
    )
}

const NotFound = () => {
    return (
        <div className={'vertical-center'}>
            <p>Opooos, the page you trying to access doesn't exist or is deleted.</p>
            <button>Back to Home</button>
        </div>
    )
}

export default App;
