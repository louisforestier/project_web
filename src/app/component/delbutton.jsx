import React from "react";

const DelButton = ({load,id, url})=> {

    const del = () => {
        console.log(url+id)
        fetch(url+id, {
            method: "DELETE"
        })
            .then(() => {
                load();
            })
    }

    return(
        <button onClick={del}>x</button>
    )
}

export default DelButton;