import React from "react";

class Planning extends React.Component {
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
        console.log("loadManche : ", planning_id);
        fetch('/api/planning/manches' + planning_id)
            .then((res) => res.json())
            .then((mancheResponse) => {
                this.setState({manches: mancheResponse});
                console.log(this.state.name);
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
                                return <div>
                                    <tr>
                                        <td>{manche.id}</td>
                                        <td>{manche.name}</td>
                                        <td>{manche.ordre}</td>
                                    </tr>
                                </div>
                            })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Planning;