import React, {useState} from "react";

class EnrollClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientId: '',
            planningId: '',
            mancheId: '',
            clients: [],
            plannings: [],
            manches: []
        }
    }

    componentDidMount() {
        this.loadPlanningsAndClients();
    }

    loadPlanningsAndClients() {
        fetch('/api/plannings/')
            .then((res) => res.json())
            .then((planningResponse) => {
                this.setState({plannings: planningResponse});
            })
        fetch('/api/clients/')
            .then((res) => res.json())
            .then((clientResponse) => {
                this.setState({clients: clientResponse});
            })
    }

    loadManchesForPlanningId(planning_id) {
        fetch('/api/plannings/manches/' + planning_id)
            .then((res) => res.json())
            .then((mancheResponse) => {
                this.setState({manches: mancheResponse});
            })
    }

    validate(e) {
        e.preventDefault();
        const inscription = {clientId:this.state.clientId,planningId:this.state.planningId,mancheId: this.state.mancheId};
        if (inscription.clientId && inscription.mancheId && inscription.planningId) {
            let body = JSON.stringify(inscription);
            fetch('/api/inscriptions/', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            })
        }
    }

    render() {
        const {clientId, planningId, mancheId, clients, plannings, manches} = this.state;
        return (
            <div>
                <h1>Enroll a client</h1>
                <form onSubmit={(e) => {
                    this.validate(e)
                }}>
                    <table>
                        <tbody>
                        <tr>
                            <td><label> Client </label></td>
                            <td>
                                <select value={clientId}
                                        onChange={(e) => this.setState({clientId: e.currentTarget.value})}>
                                    <option value="">-- select a client --</option>
                                    {
                                        clients && clients
                                            .map((client) => {
                                                return (
                                                    <option
                                                        value={client.id}>{client.first_name + ' ' + client.last_name}</option>
                                                )
                                            })
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label> Planning </label>
                            </td>
                            <td>
                                <select value={planningId} onChange={(e) => {
                                    this.setState({planningId: e.currentTarget.value});
                                    this.loadManchesForPlanningId(e.currentTarget.value)
                                }}>
                                    <option value="">-- select a planning --</option>
                                    {
                                        plannings && plannings
                                            .map((planning) => {
                                                return (
                                                    <option value={planning.id}>{planning.name}</option>
                                                )
                                            })
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label> Round </label>
                            </td>
                            <td>
                                <select value={mancheId}
                                        onChange={(e) => this.setState({mancheId: e.currentTarget.value})}>
                                    <option value="">-- select a round --</option>
                                    {
                                        manches && manches
                                            .map((manche) => {
                                                return (
                                                    <option value={manche.id}>{manche.name}</option>
                                                )
                                            })
                                    }
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="submit" value="submit"></input>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}

export default EnrollClient;






