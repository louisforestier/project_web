import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import Clients from "./view/clients";
import NavBar from "./component/navBar";
import Main from "./component/main";
import Planning from "./view/planning";

const App = (props) => {
    const links =[{name:'Home',link:'/'},{name:'Clients',link:'/clients'},{name:'Planning',link: '/planning'}];
    return (
        <Main links={links}/>
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
                <Route path="planning" element={<Planning/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
)
