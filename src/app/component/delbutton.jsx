import React from "react";

const DelButton = ({load,url,id})=> {

    const del = () => {
        fetch(url+id, {
            method: "DELETE"
        })
            .then((res)=>res.json())
            .then((eventsReponse) => {
                console.log(eventsReponse);
                load();
            })
    }

    return(
        <button onClick={del}>x</button>
    )
}

export default DelButton;