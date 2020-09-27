import React, {useEffect, useState} from 'react';
import './App.css';
import Nav from "./components/Nav";
import Home from "./components/Home";
import {Switch, Route} from 'react-router-dom'
import ArticleList from "./components/ArticleList";
import About from "./components/About";
import MyFeed from "./components/MyFeed";
import Article from "./components/Article";
import {Login} from "./components/auth/Login";
import {DashBoard} from "./components/dashboard/Dashboard";
import {UserContext} from "./context/UserContext";
import {isLoggedIn} from "./services/request";

function App() {

    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const loginData = JSON.parse(localStorage.getItem('loginDetails'));

        if (loginData) {
            const reqHeader = {"Authorization": `Token ${loginData.user.token}`};

            isLoggedIn(reqHeader).then(data => {
                if (data.status === 200) setLoggedIn(true);
                if (data.status === 401) {
                    setLoggedIn(false);
                    localStorage.removeItem('loginDetails')
                };
            });
        }
    }, [])


    return (
        <UserContext.Provider value={{loggedIn, setLoggedIn}}>
            <div className="container-fluid">
                <Nav/>
                <div className="container">
                    <Switch>
                        <Route path={'/'} exact>
                            <Home/>
                        </Route>
                        <Route path={'/articles'}>
                            <ArticleList/>
                        </Route>
                        <Route path={'/about'}>
                            <About/>
                        </Route>
                        <Route path={'/feed'}>
                            <MyFeed/>
                        </Route>
                        {/*<PRoute path={'/login'} component={Login}>*/}
                        <Route path={'/login'} component={Login}/>
                        <Route path={'/dashboard'} component={DashBoard}/>
                        <Route path={'/:slug'} component={Article}/>

                    </Switch>
                </div>
            </div>
        </UserContext.Provider>
    );
}

export default App;
