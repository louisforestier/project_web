import React from "react";
import Manche from "../component/manche";


class Planning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plannings: [],
            mode: props.mode
        }
    }

    componentDidMount() {
        this.loadPlanning();
    }


    loadPlanning = () => {
        fetch('/api/plannings')
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
                    <caption>PLANNINGS</caption>
                    <thead>
                    <tr>
                        <td>name</td>
                        <td>date</td>
                        <td>MANCHES</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        plannings && plannings
                            .map((planning) => {
                                return <tr>
                                    <td>{planning.name}</td>
                                    <td>{planning.date}</td>
                                    <td><Manche planningId={planning.id} mode={this.state.mode}/></td>
                                </tr>

                            })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Planning;