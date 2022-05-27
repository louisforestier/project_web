import React from "react";

class Inscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inscriptions: [],
            manche_id: props.manche_id,
            planning_id: props.planning_id,
            isAdmin: props.isAdmin,
            isClient: false
        }

    }

    componentDidMount() {
        this.loadInscription(this.state.planning_id, this.state.manche_id);
        this.isClientfunction();
    }


    loadInscription = (planning_id, manche_id) => {
        fetch('/api/planning/manches/inscriptions/' + planning_id + '/' + manche_id)
            .then((res) => res.json())
            .then((inscriptionResponse) => {
                console.log("result from request loadInscription: ",inscriptionResponse);
                this.setState({inscriptions: inscriptionResponse});
            })
    }

    addToManche(e){
        e.preventDefault();

        let currentmanche = {manche_id:this.state.manche_id, planning_id:this.state.planning_id};
        console.log("currentmanche => ", currentmanche);
        let body = JSON.stringify(currentmanche);
        fetch('/api/planning/manches/inscription/' + currentmanche.planning_id + '/' + currentmanche.manche_id, {
            method:"POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        })
        this.loadInscription(this.state.planning_id, this.state.manche_id);
    }

    isClientfunction(){
        fetch('/api/planning/isClient')
            .then((res) => res.json())
            .then((inscriptionResponse) => {
                console.log("inscriptionResponse", inscriptionResponse);
                this.setState({isClient: inscriptionResponse});
            })
    }

    render() {
        const {inscriptions} = this.state;
        return (
            <div>
                <table>
                    <tbody>
                    {
                        inscriptions && inscriptions
                            .map((inscription) => {
                                return  <tr>
                                    <td>{inscription.username}</td>
                                </tr>
                            })
                    }
                    {
                        this.state.isAdmin ? <></>
                            : this.state.isClient ? <tr><button onClick={this.addToManche.bind(this)}>S'inscrire</button></tr>
                            : <></>
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Inscription;