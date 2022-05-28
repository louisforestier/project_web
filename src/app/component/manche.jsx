import React from "react";

class Manche extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manches: [],
            planningId: props.planningId,
            mode: props.mode
        }
    }

    componentDidMount() {
        this.loadManche(this.state.planningId);
    }


    loadManche = (planning_id) => {
        fetch('/api/planning/manches/' + planning_id)
            .then((res) => res.json())
            .then((mancheResponse) => {
                this.setState({manches: mancheResponse});
            })
    }

    addToManche = (value) => {
        let currentmanche = {manche_id: value, planning_id: this.state.planning_id};
        console.log("currentmanche => ", currentmanche);
        let body = JSON.stringify(currentmanche);
        fetch('/api/planning/manches/inscription/' + currentmanche.planning_id + '/' + currentmanche.manche_id, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(()=> this.loadManche(this.state.planningId))
    }


    render() {
        const {manches} = this.state;
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <td>name</td>
                        <td>ordre</td>
                        <td>number</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        manches && manches
                            .map((manche) => {
                                return<tr>
                                        <td>{manche.name}</td>
                                        <td>{manche.ordre}</td>
                                        <td>{manche.number}</td>
                                    {
                                        this.state.mode !== "visitor" &&
                                        <td><button value={manche.id} onClick={e => this.addToManche(e.currentTarget.value) }>S'inscrire</button></td>
                                    }
                                    </tr>
                            })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Manche;