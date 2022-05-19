import React from "react";
import DelButton from "../component/delbutton";

class Clients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: []
        }
    }

    componentDidMount() {
        this.loadClients();
    }


    loadClients = () => {
        fetch('/api/clients')
            .then((res) => res.json())
            .then((clientsReponse) => {
                this.setState({clients: clientsReponse});
            })
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
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <td>id</td>
                        <td>username</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        clients && clients
                            .map((client) => {
                                return <tr>
                                    <td>{client.id}</td>
                                    <td>{client.username}</td>
                                    <td>
                                        <DelButton load={this.loadClients} id={client.id} url={'/api/clients/'}/>
                                    </td>
                                </tr>
                            })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Clients;