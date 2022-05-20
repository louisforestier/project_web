import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import Clients from "./view/clients";
import NavBar from "./component/navBar";

const App = (props) => {
    const links =[{name:'Home',link:'/'},{name:'Clients',link:'/clients'}];
    return (
        <div>
            <NavBar links={links}/>
            <Outlet/>
        </div>
    )
}

const root = ReactDOM.createRoot(
    document.getElementById("main")
)

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}>
                <Route path="clients" element={<Clients/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
)
