import React from "react";
import Inscription from "./inscription";
import AddManche from "./add_manche";

class Manche extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manches: [],
            planning_id: props.planning_id
        }

    }

    componentDidMount() {
        this.loadManche(this.state.planning_id);
    }


    loadManche = (planning_id) => {
        fetch('/api/planning/manches/' + planning_id)
            .then((res) => res.json())
            .then((mancheResponse) => {
                this.setState({manches: mancheResponse});
            })
    }

    render() {
        const {manches} = this.state;
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                        <td>ordre</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        manches && manches
                            .map((manche) => {
                                return<tr>
                                        <td>{manche.id}</td>
                                        <td>{manche.name}</td>
                                        <td>{manche.ordre}</td>
                                        <td><Inscription manche_id={manche.id} planning_id={manche.planning_id}/></td>
                                    </tr>
                            })
                    }
                    </tbody>
                </table>
                <AddManche load={this.loadManche} planning={this.state.planning_id}/>
            </div>
        )
    }
}

export default Manche;