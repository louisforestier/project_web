import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import Clients from "./view/clients";
import NavBar from "./component/navBar";
import Main from "./component/main";

const App = (props) => {
    return (
        <h1>Home</h1>
    )
}

const root = ReactDOM.createRoot(
    document.getElementById("main")
)
const links =[{name:'Home',link:'/'},{name:'Clients',link:'/clients'}];

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main links={links}/>}>
                <Route index element={<App/>}></Route>
                <Route path="clients" element={<Clients/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
)
