import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import Clients from "./view/clients";
import Main from "./component/main";
import Planning from "./view/planning";

const root = ReactDOM.createRoot(
    document.getElementById("main")
)
const links =[{name:'Planning',link:'/'},{name:'Clients',link:'/clients'}];

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main links={links}/>}>
                <Route index element={<Planning/>}></Route>
                <Route path="clients" element={<Clients/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
)
