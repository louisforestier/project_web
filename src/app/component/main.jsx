import React from "react";
import NavBar from "./navBar";
import {Outlet} from "react-router-dom";

const Main = ({links}) => {
    return (
        <div>
            <NavBar links={links}/>
            <NavBar/>
            <h1>Home</h1>
            <Outlet/>
        </div>
    )
}

export default Main;