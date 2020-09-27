import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import styles from './Nav.module.css'
import {UserContext} from "../context/UserContext";

const Nav = () => {

    const {loggedIn, setLoggedIn} = useContext(UserContext)

    const logOutHandler = () => {
        localStorage.removeItem("loginDetails");
        setLoggedIn({loggedIn: false, checked: true});
    }

    return (
        <header className={styles.mainHeader}>
            <div className="container">
                <div className={styles.container}>
                    <NavLink to="/"><img src="#" alt="logo"/></NavLink>
                    <nav>
                        <NavLink activeClassName={styles.activeNavItem} className={styles.navItem} to={'/'} exact>Home</NavLink>
                        <NavLink activeClassName={styles.activeNavItem} className={styles.navItem} to={'/articles'}>All Articles</NavLink>
                        {/*<NavLink activeClassName={styles.activeNavItem} className={styles.navItem} to={'/feed'}>My Feed</NavLink>*/}
                        <NavLink activeClassName={styles.activeNavItem} className={styles.navItem} to={'/about'}>About</NavLink>
                        {loggedIn.loggedIn
                            ? (<div className={styles.submenuContainer}>
                                <NavLink to={'#'} className={`${styles.navItem} ${styles.cta}`}>My Account</NavLink>
                                <div className={styles.submenu}>
                                    <NavLink className={styles.navItem} to={'/dashboard'}>Dashboard</NavLink>
                                    <NavLink className={styles.navItem} to={'/feed'}>My Feed</NavLink>
                                    <NavLink className={styles.navItem} to={"#"} onClick={logOutHandler}>Logout</NavLink>
                                </div>
                            </div>)
                            : <NavLink className={`${styles.navItem} ${styles.cta}`} to={'/login'}>Login</NavLink>
                        }
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Nav;