import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import styles from './Nav.module.css'
import {UserContext} from "../context/UserContext";

const Nav = () => {

    const {loggedIn} = useContext(UserContext)
    // console.log("islogg:", isLoggedIn)

    return (
        <header className={styles.mainHeader}>
            <div className="container">
                <div className={styles.container}>
                    <NavLink to="/"><img src="#" alt="logo"/></NavLink>
                    <nav>
                        <NavLink activeClassName={styles.activeNavItem} className={styles.navItem} to={'/'} exact>Home</NavLink>
                        <NavLink activeClassName={styles.activeNavItem} className={styles.navItem} to={'/articles'}>All Articles</NavLink>
                        <NavLink activeClassName={styles.activeNavItem} className={styles.navItem} to={'/feed'}>My Feed</NavLink>
                        <NavLink activeClassName={styles.activeNavItem} className={styles.navItem} to={'/about'}>About</NavLink>
                        <NavLink className={`${styles.navItem} ${styles.cta}`} to={'/login'}>{loggedIn ? "Logout" : "Login"}</NavLink>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Nav;