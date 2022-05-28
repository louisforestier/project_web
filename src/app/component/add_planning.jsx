import React, {useState} from "react";


const AddPlanning = ({loadPlannings}) => {
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date());
    const [roundName,setRoundName] = useState("");

    const validate = (e)=>{
        e.preventDefault();
        if (name !=="") {
            let bodyLocal = JSON.stringify({name, date});
            fetch('/api/planning/', {
                method: "POST",
                body: bodyLocal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then()
        }
    }

    const add_round = (e) => {
        console.log("add_round")
        return (
            <div>
            <label> Round name </label>
            <input type="text" value={roundName} onChange={(e) => setRoundName(e.currentTarget.value)}/>
            </div>
        )
    }

    return (
        <form onSubmit={(e)=>{validate(e)}}>
            <label> name </label>
            <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)}/>
            <label> date </label>
            <input type="date" value={date} onChange={(e) => setDate(new Date(e.currentTarget.value))}/>
            <button onClick={add_round}>Add round</button>
            <br/>
            <input type="submit" value="submit"></input>
        </form>
    )
}
export default AddPlanning;






