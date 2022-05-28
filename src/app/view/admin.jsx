import React from "react";
import Add_planning from "../component/add_planning";
import DelUser from "../component/delete_user";


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
            planning_date: new Date(),
            checked: false
        }
    }

    componentDidMount() {
        this.loadList();
        this.loadUsers();
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

    loadUsers = (checked) => {
        console.log("LOAD USERS");
        fetch('/api/clients/' + checked)
            .then((res) => res.json())
            .then((tokenResponse) => {
                this.setState({tokens: tokenResponse});
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

    handleChange = () => {
        this.setState({checked: !this.state.checked});
        this.loadUsers(this.state.checked);
    };

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
                <label>
                    Display expired users ?
                    <input type="checkbox" checked={this.state.checked} onChange={this.handleChange} />
                </label>
                <DelUser load={this.loadUsers} tokens={this.state.tokens} checked={this.state.checked}/>
            </div>
        )
    }
}

export default Admin;