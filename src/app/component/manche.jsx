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
        fetch('/api/plannings/'+planning_id+'/manches')
            .then((res) => res.json())
            .then((mancheResponse) => {
                this.setState({manches: mancheResponse});
            })
    }

    addToManche = (value) => {
        const inscription = {planningId:this.state.planningId,mancheId: value};
        if (inscription.mancheId && inscription.planningId) {
            let body = JSON.stringify(inscription);
            fetch('/api/inscriptions/', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })
                .then(()=> this.loadManche(this.state.planningId))
        }
    }

    render() {
        const {manches} = this.state;
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Ordre</td>
                        <td>Number of participants</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        manches && manches
                            .map((manche) => {
                                return <tr>
                                    <td>{manche.name}</td>
                                    <td>{manche.ordre}</td>
                                    <td>{manche.number}</td>
                                    {
                                        this.state.mode !== "visitor" &&
                                        <td>
                                            <button value={manche.id}
                                                    onClick={e => this.addToManche(e.currentTarget.value)}>Enroll
                                            </button>
                                        </td>
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