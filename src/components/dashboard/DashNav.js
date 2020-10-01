import React from "react";
import styles from "./Dashboard.module.css";
import {NavLink} from "react-router-dom";

export const DashNav = () => {
    return (
        <div className={styles.dashNav}>
            <NavLink activeClassName={styles.active} exact to={'/dashboard'}>Home</NavLink>
            <NavLink activeClassName={styles.active} to={'/dashboard/create'}>New Article</NavLink>
            <NavLink activeClassName={styles.active} to={'/dashboard/profile'}>Profile</NavLink>
        </div>
    )
}