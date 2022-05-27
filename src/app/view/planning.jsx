import React from "react";
import Add_planning from "../component/add_planning";
import Manche from "../component/manche";


class Planning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plannings: [],
            name: "",
            date: new Date(),
            isAdmin: false
        }
    }

    componentDidMount() {
        this.loadPlanning();
        this.isAdmin();
    }


    loadPlanning = () => {
        fetch('/api/planning')
            .then((res) => res.json())
            .then((planningResponse) => {
                this.setState({plannings: planningResponse});
            })
    }

    isAdmin = () => {
        fetch('/api/planning/isAdmin')
            .then((res)=> res.json())
            .then((isAdminResponse)=>{
                this.setState({isAdmin: isAdminResponse});
            })
    }

    render() {
        const {plannings} = this.state;
        return (
            <div>
                <table>
                    <caption>PLANNINGS</caption>
                    <thead>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                        <td>date</td>
                        <td>MANCHES</td>
                        <td>INSCRITS</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        plannings && plannings
                            .map((planning) => {
                                return <tr>
                                        <td>{planning.id}</td>
                                        <td>{planning.name}</td>
                                        <td>{planning.date}</td>
                                        <td><Manche planning_id={planning.id} isAdmin={this.state.isAdmin}/></td>
                                    </tr>

                            })
                    }
                    </tbody>
                </table>
                {
                this.state.isAdmin ? <Add_planning load={this.loadPlanning}/>
                    : <></>
                }
            </div>
        )
    }
}

export default Planning;