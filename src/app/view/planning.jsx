import React from "react";
import Add_planning from "../component/add_planning";


class Planning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plannings: [],
            name: "",
            date: new Date()
        }
    }

    componentDidMount() {
        this.loadPlanning();
    }


    loadPlanning = () => {
        fetch('/api/planning')
            .then((res) => res.json())
            .then((planningResponse) => {
                this.setState({plannings: planningResponse});
            })
    }



    render() {
        const {plannings} = this.state;
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                        <td>date</td>
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
                                </tr>
                            })
                    }
                    </tbody>
                </table>
                <Add_planning />
            </div>
        )
    }
}

export default Planning;