import React from "react";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            cpassword: ""
        }
    }


    add = (e) => {
        e.preventDefault();
        let bodyLocal = JSON.stringify({firstname:this.state.firstname,lastname:this.state.lastname,
            username:this.state.username,password:this.state.password,cpassword:this.state.cpassword});
        console.log(bodyLocal)
        fetch('/api/clients',{
            method:"POST",
            body:bodyLocal,
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
            .then((res)=>{
                if (res.status==200)
                    window.location ='/signin';
            })
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <form onSubmit={this.add}>
                    <table>
                        <tbody>
                        <tr>
                            <td><label> User name </label></td>
                            <td>
                                <input type="text" value={this.state.username} onChange={(e) => this.setState({username:e.currentTarget.value})}/>
                            </td>
                        </tr>
                        <tr>
                            <td><label> Password </label></td>
                            <td>
                                <input type="password" value={this.state.password} onChange={(e) => this.setState({password:e.currentTarget.value})}/>
                            </td>
                        </tr>
                        <tr>
                            <td><label> Confirm password </label></td>
                            <td>
                                <input type="password" value={this.state.cpassword} onChange={(e) => this.setState({cpassword:e.currentTarget.value})}/>
                            </td>
                        </tr>
                        <tr>
                            <td><label> First name </label></td>
                            <td>
                                <input type="text" value={this.state.firstname} onChange={(e) => this.setState({firstname:e.currentTarget.value})}/>
                            </td>
                        </tr>
                        <tr>
                            <td><label> Last name </label></td>
                            <td>
                                <input type="text" value={this.state.lastname} onChange={(e) => this.setState({lastname:e.currentTarget.value})}/>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button>Sign up</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        )
    }
}

export default Signup;