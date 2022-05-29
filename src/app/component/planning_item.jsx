import React, {useState} from "react";
import Manche from "./manche";

import "./planning_item.css"

const PlanningItem = ({planning,mode}) => {
    const [liclass, setLiclass] = useState("caret");
    const [ulclass, setUlclass] = useState("nested");


    const display = () => {
        if (liclass === "caret") {
            setLiclass("caret-down")
            setUlclass("activeTreeItem")
        }
        else {
            setLiclass("caret")
            setUlclass("nested")
        }
    }


    return (
        <li className={liclass} onClick={display}>
            <span>{planning.name}</span>
            <span>{planning.date}</span>
            <ul className={ulclass}>
                <li><Manche planningId={planning.id} mode={mode}/></li>
            </ul>
        </li>
    )
}
export default PlanningItem;







