import React from "react";

const DelTokenButton = ({load,id, url, checked})=> {

    const delToken = () => {
        fetch(url+id, {
            method: "DELETE"
        })
            .then(()=>{
            })
        load(!checked)
    }

    return(
        <button onClick={delToken}>x</button>
    )
}

export default DelTokenButton;