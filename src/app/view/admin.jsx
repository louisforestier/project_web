import React from "react";
import Add_planning from "../component/add_planning";


class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tokens: []
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
        fetch('api/planning')
            .then((res) => res.json())
            .then((planningResponse) => {this.state({plannings:planningResponse})})
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
                <h1>Enroll a client</h1>
                is coming
                <h1>Disconnect a client</h1>
                is coming
            </div>
        )
    }
}

export default Admin;