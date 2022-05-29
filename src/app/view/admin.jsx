import React from "react";
import AddPlanning from "../component/add_planning";
import DisconnectClients from "../component/disconnect_client";
import EnrollClient from "../component/enroll_client";


class Admin extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <AddPlanning />
                <EnrollClient/>
                <DisconnectClients />
            </div>
        )
    }
}

export default Admin;