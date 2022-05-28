import React, {useState} from "react";


const AddPlanning = ({loadPlannings}) => {
    const [name, setName] = useState("");
    const [date, setDate] = useState(new Date());
    const [plannings, setPlannings] = useState([])


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
                .then((res) => {
                    return res.json()
                })
                .then((planningReponse) => {
                    console.log("add_planning : planningReponse = ", planningReponse)
                    loadPlannings()
                    //this.setState({plannings:planningReponse})
                    //setPlannings(planningReponse)
                })
        }
    }

    return (
        <form onSubmit={(e)=>{validate(e)}}>
            <label> name </label>
            <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)}/>
            <label> date </label>
            <input type="date" onChange={(e) => setDate(new Date(e.currentTarget.value))}/>
            <input type="submit" value="+"></input>
        </form>
    )
}
export default AddPlanning;






