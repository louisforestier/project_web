const express = require('express');
const {v4} = require('uuid');
const router = express.Router();
const pgConnect = require('../pgConnect');
const {getClients} = require("../pgConnect");



router.get('/', (req, res) => {
    getClients()
        .then((clients)=> {
            res.send(clients);
        })
})


module.exports={
    clientRouter:router
}