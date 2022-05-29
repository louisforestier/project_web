const express = require('express');
const {v4} = require('uuid');
const visitorApiRouter = express.Router();
const adminApiRouter = express.Router();

const pgConnect = require('../pgConnect');

//Obtenir tous les plannings
visitorApiRouter.get('/', (req, res) => {
    pgConnect.getPlannings()
        .then((plannings)=> {
            res.send(plannings);
        })
})

//Ajouter un planning
adminApiRouter.post('/', (req, res)=>{
    const new_planning = req.body;
    const planning_id = v4()
    const planning = {id:planning_id, name:new_planning.name, date:new_planning.date};
    pgConnect.insertPlanning(planning)
        .then((value) => {
            res.send(value);
        })
    const i = 1
    new_planning.rounds.forEach((round, i) => {
        const new_round = {id: v4(), name: round.name, ordre: i+1, planning_id: planning_id}
        pgConnect.insertManche(new_round)
    })
})

//Get les manches pour un certain planning
visitorApiRouter.get('/:planning_id/manches', (req, res) => {
    let planning_id = req.params.planning_id;
    pgConnect.getManchesByPlanningId(planning_id)
        .then((manches) => {
            res.send(manches);
        })
})


module.exports={
    visitorPlanningRouter:visitorApiRouter,
    adminPlanningRouter:adminApiRouter
}