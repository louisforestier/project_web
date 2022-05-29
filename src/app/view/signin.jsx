import React, {useState} from "react";

const Signin = (props) => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    return (

        <div>
            <h1>Connection</h1>
            <form method={'POST'} action={"/login"}>
                <label htmlFor={"username"}>Username</label>
                <input required id={"username"} name={"username"} type={"text"} onChange={(e)=>setUsername(e.currentTarget.value)}/>
                <label htmlFor={"password"}>Password</label>
                <input required id={"password"} name={"password"} type={"password"} onChange={(e)=>setPassword(e.currentTarget.value)}/>
                <button type={"submit"}>Log in</button>
            </form>
        </div>
    )
}

export default Signin;