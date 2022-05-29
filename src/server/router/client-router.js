const express = require('express');
const {v4} = require('uuid');
const router = express.Router();
const pgConnect = require('../pgConnect');


router.get('/', (req, res) => {
    pgConnect.getClients()
        .then((clients)=> {
            res.send(clients);
        })
})

router.post('/',(req,res)=>{
    const {firstname,lastname,username,password,cpassword} = req.body
    if (password == cpassword) {
        const client = {id:v4(),username:username,password:password,admin:false,firstname:firstname,lastname:lastname}
        pgConnect.insertClient(client)
            .then(() => {
                res.redirect('/signin')
            })
    }

})

router.get('/tokens/:checked', (req, res)=> {
    const tokenID = req.cookies.MON_TOKEN;
    if (req.params.checked === "false") {
        pgConnect.getTokens(tokenID)
            .then((tokens) => {
                console.log("router tokens")
                res.send(tokens);
            })
    }
    else {
        pgConnect.getUnexpiredToken(tokenID)
            .then((tokens) => {
                console.log("router unexpired get")
                res.send(tokens);
            })
    }
})

router.delete('/delete/:id', (req, res, next) => {
    console.log("router.delete");
    pgConnect.deleteTokenById(req.params.id)
        .then();
})

module.exports={
    clientRouter:router
}