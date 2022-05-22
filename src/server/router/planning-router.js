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

router.get('/manches/:planning_id', (req, res) => {
    const {planning_id} = req.params.planning_id;
    console.log("GET : planning_id : ", planning_id);
    pgConnect.getManchesByPlanningId(planning_id)
        .then((manches) => {
            res.send(manches);
        })
})



module.exports={
    planningRouter:router
}