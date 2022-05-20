import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route, Outlet} from "react-router-dom";
import Main from "./component/main";

const App = (props) => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    return (

        <div>
            <h1>Connection</h1>
            <form method={'POST'} action={"/login"}>
                <label htmlFor={"username"}>Username</label>
                <input id={"username"} name={"username"} type={"text"} onChange={(e)=>setUsername(e.currentTarget.value)}/>
                <label htmlFor={"password"}>Password</label>
                <input id={"password"} name={"password"} type={"password"} onChange={(e)=>setPassword(e.currentTarget.value)}/>
                <button type={"submit"}>Log in</button>
            </form>
        </div>
    )
}

const root = ReactDOM.createRoot(
    document.getElementById("main")
)

const links =[{name:'Home',link:'/'},{name:'Login',link:'/'}];

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Main links={links}/>}>
                <Route index element={<App/>}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
)