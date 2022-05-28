import React, {useState} from "react";
import DelButton from "./delbutton";

const DelUser = ({load, tokens, checked})=> {

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
                                <td><DelButton load={load} id={token.id} url={'/api/clients/'} checked={checked}/></td>
                            </tr>
                        })
                }
                </tbody>
            </table>
        </div>
    )

}

export default DelUser;