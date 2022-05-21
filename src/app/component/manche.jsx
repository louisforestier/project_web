import React from "react";

class Planning extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manches:[],
            name: "",
            ordre: "",
            planning: {}

        }
    }

    componentDidMount() {
        this.loadManche();
    }


    loadManche = () => {
        fetch('/api/planning/manches')
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