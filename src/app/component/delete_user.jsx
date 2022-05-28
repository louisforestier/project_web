import React, {useState} from "react";
import DelButton from "./delbutton";

const DelUser = ()=> {
    //client_id, username, expiration_time
    const [tokens, setTokens] = useState([])
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

const loadUsers = () => {
        fetch('/api/admin/' + checked)
            .then((res) => res.json())
            .then((tokenResponse) => {
                setTokens(tokenResponse)
            })
    }

    return(
        <div>
            <table>
                <thead>
                <tr>
                    <td>username</td>
                </tr>
                </thead>
                <tbody>
                {
                    tokens && tokens
                        .map((token) => {
                            return<tr>
                                <td>{token.username}</td>
                                <td>{token.expiration_time}</td>
                                <td><DelButton load={loadUsers} id={token.id} url={'/api/admin/'}/></td>
                            </tr>
                        })
                }
                </tbody>
            </table>
            <label>
                Display expired users ?
                <input type="checkbox" checked={checked} onChange={handleChange} />
            </label>
        </div>
    )

}

export default DelUser;