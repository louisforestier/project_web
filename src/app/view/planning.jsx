import React from "react";
import PlanningItem from "../component/planning_item";


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
                <ul>
                    {
                        plannings && plannings
                            .map((planning) => {
                                return <PlanningItem planning={planning} mode={this.state.mode}/>
                            })
                    }
                </ul>
            </div>
        )
    }
}

export default Planning;