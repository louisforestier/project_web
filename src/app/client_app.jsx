import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import Main from "./component/main";
import Planning from "./view/planning";

const root = ReactDOM.createRoot(
    document.getElementById("main")
)
const links =[{name:'Planning',link:'/'}];

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main links={links}/>}>
                <Route index element={<Planning mode={"client"}/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
)
