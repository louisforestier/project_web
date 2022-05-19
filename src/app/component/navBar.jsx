import React from "react";
import {NavLink} from "react-router-dom";

import  './navbar.css'

const NavBar = (props) => {
    return (
        <div>
            <nav>
                <NavLink activeClassName="active" to="/">Home</NavLink>
                <NavLink activeClassName="active" to="/comments">Comments</NavLink>
                <NavLink activeClassName="active" to="/users">Users</NavLink>
            </nav>
        </div>
    )
}

export default NavBar;