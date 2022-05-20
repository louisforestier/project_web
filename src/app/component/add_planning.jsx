import React, {useState} from "react";


const AddPlanning = ({loadPlannings}) => {
    const [name,setName] = useState("");
    const [date,setDate] = useState(new Date());
    const [plannings,setPlannings] = useState([])

    const validate = (e) => {
        e.preventDefault();
        let bodyLocal = JSON.stringify({name:name,date:date});
        fetch('/api/planning',{
            method:"POST",
            body:bodyLocal,
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
            .then((res)=>{return res.json()})
            .then((planningReponse)=>{
                loadPlannings()
            })
    }

    return (
        <form onSubmit={validate}>
            <label> name </label>
            <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)}/>
            <label> date </label>
            <input type="date" value={date} onChange={(e) => setDate(e.currentTarget.value)}/>
            <button>+</button>
        </form>
    )
}
export default AddPlanning;






