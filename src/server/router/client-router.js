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

module.exports={
    clientRouter:router
}