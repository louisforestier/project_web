const express = require('express');
const {v4} = require('uuid');
const router = express.Router();
const pgConnect = require('../pgConnect');


router.get('/', (req, res) => {
    pgConnect.getPlannings()
        .then((plannings)=> {
            res.send(plannings);
        })
})

router.get('/manches', (req, res) => {
    pgConnect.getManches()
        .then((manches) => {
            res.send(manches);
        })
})



module.exports={
    planningRouter:router
}