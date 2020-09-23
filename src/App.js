import React from 'react';
import './App.css';
import Nav from "./components/Nav";
import Home from "./components/Home";
import {Switch, Route} from 'react-router-dom'
import ArticleList from "./components/ArticleList";
import About from "./components/About";
import MyFeed from "./components/MyFeed";
import Article from "./components/Article";

function App() {
    return (
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
                    <Route path={'/:slug'} component={Article}/>
                    <Route/>
                </Switch>
            </div>
        </div>
    );
}

export default App;
