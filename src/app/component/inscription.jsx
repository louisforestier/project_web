import React from "react";

class Inscription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inscriptions: [],
            manche_id: props.manche_id,
            planning_id: props.planning_id
        }

    }

    componentDidMount() {
        this.loadInscription(this.state.planning_id, this.state.manche_id);
    }


    loadInscription = (planning_id, manche_id) => {

        console.log("loadInscription : ", planning_id, ' and ', manche_id);
        fetch('/api/planning/manches/inscriptions/' + planning_id + '/' + manche_id)
            .then((res) => res.json())
            .then((inscriptionResponse) => {
                console.log("result from request loadInscription: ",inscriptionResponse);
                this.setState({inscriptions: inscriptionResponse});
            })
        console.log("inscriptions in state : ", this.state.inscriptions);
    }



    render() {
        const {inscriptions} = this.state;
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <td>name</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        inscriptions && inscriptions
                            .map((inscription) => {
                                return <tr>
                                    <td>{inscription.username}</td>
                                </tr>
                            })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Inscription;