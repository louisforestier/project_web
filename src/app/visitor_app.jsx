import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import Main from "./component/main";
import Signup from "./view/signup";

import Signin from "./view/signin";
import Planning from "./view/planning";


const root = ReactDOM.createRoot(
    document.getElementById("main")
)

const links =[{name:'Plannings',link:'/'},{name:'Sign in',link:'/signin'},{name: 'Sign Up',link: '/signup'}];

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main links={links}/>}>
                <Route index element={<Planning/>}/>
                <Route path='signup' element={<Signup/>}/>
                <Route path="/signin" element={<Signin/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
)