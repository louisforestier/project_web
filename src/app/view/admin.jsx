import React from "react";
import Add_planning from "../component/add_planning";
import Enroll_client from "../component/enroll_client";
import EnrollClient from "../component/enroll_client";


class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tokens: [],
            token_id : "",
            clients : [],
            plannings : [],
            manches : [],
            planning_name: "",
            planning_date: new Date()
        }
    }

    componentDidMount() {
        this.loadList();
    }


    loadList = () => {
        fetch('/api/clients')
            .then((res) => res.json())
            .then((clientsReponse) => {
                this.setState({clients: clientsReponse});
            })
        fetch('api/plannings')
            .then((res) => res.json())
            .then((planningResponse) => {this.setState({plannings:planningResponse})})
    }

    suppr(client) {
        fetch('/api/clients/' + client.id, {
            method: 'DELETE'
        })
            .then((res) => res.json())
            .then((clientsReponse) => {
                console.log(clientsReponse);
                this.setState({clients: clientsReponse});
            })
    }

    render() {
        const {clients} = this.state;
        const {plannings} = this.state;
        return (
            <div>
                <h1>Create planning</h1>
                <Add_planning />
                <EnrollClient/>
                <h1>Disconnect a client</h1>
                is coming
            </div>
        )
    }
}

export default Admin;