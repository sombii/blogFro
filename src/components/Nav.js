import React from "react";
import {NavLink} from "react-router-dom";

const Nav = () => {
    return (
        <header className={'mainHeader'}>
            <div className="container">
                <NavLink to="/"><img src="#" alt="logo"/></NavLink>
                <nav>
                    <NavLink activeClassName={'activeNavItem'} className={'navItem'} to={'/'} exact>Home</NavLink>
                    <NavLink activeClassName={'activeNavItem'} className={'navItem'} to={'/articles'}>All Articles</NavLink>
                    <NavLink activeClassName={'activeNavItem'} className={'navItem'} to={'/feed'}>My Feed</NavLink>
                    <NavLink activeClassName={'activeNavItem'} className={'navItem'} to={'/about'}>About</NavLink>
                    <NavLink className={'navItem cta'} to={'/about'}>Login</NavLink>
                </nav>
            </div>
        </header>
    )
}

export default Nav;