import React from "react";
import NavBar from "./navBar";
import {Outlet} from "react-router-dom";

const Main = ({links}) => {
    return (
        <div>
            <NavBar links={links}/>
            <NavBar/>
            <Outlet/>
        </div>
    )
}

export default Main;