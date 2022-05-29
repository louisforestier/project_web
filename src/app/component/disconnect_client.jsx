import React from "react";
import DelButton from "./delbutton";

class DisconnectClients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tokens: [],
            checked: true
        }
    }

    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = () => {
        console.log("LOAD USERS with ", this.state.checked);
        if(this.state.checked){
            fetch('/api/clients/tokens')
                .then((res) => res.json())
                .then((tokenResponse) => {
                    this.setState({tokens: tokenResponse});
                })
        }
        else {
            console.log("loadUser vaut true");
            fetch('/api/clients/tokens/connected')
                .then((res) => res.json())
                .then((tokenResponse) => {
                    this.setState({tokens: tokenResponse});
                })
        }
    }

    handleChange = () => {
        this.setState({checked: !this.state.checked,});
        this.loadUsers();
    };

    render() {
        const {tokens} = this.state;
        return(
            <div>
                <h1>Disconnect a client</h1>
                <label>
                    Display expired users ?
                    <input type="checkbox" defaultChecked={this.state.checked} onChange={this.handleChange} />
                </label>
                <table>
                    <thead>
                    <tr>
                        <td>username</td>
                        <td>expiration time</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tokens && tokens
                            .map((token) => {
                                return <tr>
                                    <td>{token.username}</td>
                                    <td>{token.expiration_time}</td>
                                    <td><DelButton load={this.loadUsers} id={token.id} url={'/api/clients/tokens/'}/></td>
                                </tr>
                            })
                    }
                    </tbody>
                </table>
            </div>
        )
    }

}

export default DisconnectClients;