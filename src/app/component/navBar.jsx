import React from "react";
import {NavLink} from "react-router-dom";

import  './navbar.css'

const NavBar = ({links}) => {
    console.log(links);
    return (
        <div>
            <nav>
                {
                    links && links.
                    map(({name,link})=>{
                        return <NavLink activeClassName="active" to={link}>{name}</NavLink>
                    })
                }
            </nav>
        </div>
    )
}

export default NavBar;