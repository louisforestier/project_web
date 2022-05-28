import React, {useState} from "react";


const AddManche = ({load, planning}) => {
    const [name, setName] = useState("");
    const [ordre, setOrdre] = useState("");

    const validate = (e)=>{
        e.preventDefault();
        if (name !=="" && ordre !== "") {
            let bodyLocal = JSON.stringify({name, ordre, planning});
            fetch('/api/plannings/manches', {
                method: "POST",
                body: bodyLocal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    return res.json()
                })
                .then((mancheReponse) => {
                    load(planning)
                })
        }
    }

    return (
        <form onSubmit={(e)=>{validate(e)}}>
            <legend>Add a manche</legend>
            <label> name </label>
            <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)}/>
            <label> ordre </label>
            <input type="number" value={ordre} onChange={(e) => setOrdre(e.currentTarget.value)}/>
            <input type="submit" value="+"></input>
        </form>
    )
}
export default AddManche;