import React, {useState} from "react";
import DelTokenButton from "./delTokenButton";

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
                                <td><DelTokenButton load={load} id={token.id} url={'/api/clients/delete/'} checked={checked}/></td>
                            </tr>
                        })
                }
                </tbody>
            </table>
        </div>
    )

}

export default DelUser;