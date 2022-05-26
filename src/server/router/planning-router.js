const express = require('express');
const {v4} = require('uuid');
const router = express.Router();
const pgConnect = require('../pgConnect');

//Obtenir tous les plannings
router.get('/', (req, res) => {
    pgConnect.getPlannings()
        .then((plannings)=> {
            res.send(plannings);
        })
})

//Ajouter un planning
router.post('/addPlanning', (req, res)=>{
    const new_planning = req.body;
    const planning = {id:v4(), name:new_planning.name, date:new_planning.date};
    pgConnect.insertPlanning(planning)
        .then((value) => {
            res.send(value);
        })

})


//Get les manches pour un certain planning
router.get('/manches/:planning_id', (req, res) => {
    let planning_id = req.params.planning_id;
    pgConnect.getManchesByPlanningId(planning_id)
        .then((manches) => {
            res.send(manches);
        })
})

//Get les inscription pour un planning et une manche donnés
router.get('/manches/inscriptions/:planning_id/:manche_id', (req, res) => {
    let planning_id = req.params.planning_id;
    const manche_id = req.params.manche_id;
    pgConnect.getInscriptionsByPlanningIdAndMancheId(planning_id, manche_id)
        .then((inscriptions) => {
            res.send(inscriptions);
        })
})

//ajouter l'utilisateur courant à la liste des inscrits dans une manche
router.post('/manches/inscription/:planning_id/:manche_id', (req, res)=>{
    const current_user = req.user.id;
    let manche_id = req.params.manche_id;
    let planning_id = req.params.planning_id;
    pgConnect.insertUserToInscription(current_user, manche_id, planning_id)
        .then((inscription)=>{
            res.send(inscription);
        })
})

module.exports={
    planningRouter:router
}