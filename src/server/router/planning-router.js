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

router.get('/manches/:id', (req, res) => {
    console.log("planning-router : \nAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAA\n", req.params.planning_id)
    pgConnect.getManchesByPlanningId(req.params.planning_id)
        .then((manches) => {
            res.send(manches);
        })
})



module.exports={
    planningRouter:router
}