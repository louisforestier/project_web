const express = require('express');
const {v4} = require('uuid');
const router = express.Router();
const bcrypt = require('bcrypt');
const pgConnect = require('../pgConnect');
const saltRounds = 10;

router.get('/', (req, res) => {
    pgConnect.getClients()
        .then((clients)=> {
            res.send(clients);
        })
})

router.post('/',(req,res)=>{
    const {firstname,lastname,username,password,cpassword} = req.body
    if (password == cpassword) {
        bcrypt.hash(password,saltRounds,(err,hash)=>{
            const client = {id:v4(),username:username,password:hash,admin:false,firstname:firstname,lastname:lastname}
            pgConnect.insertClient(client)
                .then(() => {
                    res.sendStatus(200);
                })
        })
    }

})

router.get('/tokens', (req, res)=> {
    const tokenID = req.cookies.MON_TOKEN;
        pgConnect.getTokens(tokenID)
            .then((tokens) => {
                console.log("router tokens")
                res.send(tokens);
            })
})

router.get('/unexpiredtokens', (req, res)=> {
    const tokenID = req.cookies.MON_TOKEN;
    pgConnect.getUnexpiredToken(tokenID)
        .then((tokens) => {
            console.log("router unexpired get")
            res.send(tokens);
        })
})

router.delete('/token/:id', (req, res, next) => {
    console.log("router.delete");
    pgConnect.deleteTokenById(req.params.id)
        .then();
})

module.exports={
    clientRouter:router
}