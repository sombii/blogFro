import React from "react";
import styles from './Dashboard.module.css'
import {DashNav} from "./DashNav";
import {Link, Route} from "react-router-dom";
import {Switch} from "react-router";
import {CreateArticle} from "./CreateArticle";
import {Profile} from "./Profile";

export const DashBoard = () => {
    return (
        <div className={styles.dashContainer}>
            <DashNav/>
            <Switch>
                <Route path={'/dashboard/create'} component={CreateArticle}/>
                <Route path={'/dashboard/profile'} component={Profile}/>
                <Route path={'/dashboard'} component={Dash}/>
            </Switch>
        </div>
    )
}

const Dash = () => {
    return (
        <div className={styles.dashMain}>
            <h2>Dashboard Home</h2>
            <Link className={styles.dashItems} to={'/dashboard/create'}>Create New<br/><small>Create a new article and publish it online.</small></Link>
            <Link className={styles.dashItems} to={'/dashboard/profile'}>Edit Profile<br/><small>View and update your profile settings for this site.</small></Link>
        </div>
    )
}