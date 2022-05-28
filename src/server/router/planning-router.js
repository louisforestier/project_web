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

//l'utilisateur courant est-il un administrateur ?
router.get('/isAdmin', (req, res)=> {
    if(req.user)
        res.send(req.user.admin);
    else
        res.send(false);
})

//l'utilisateur courant est-il un client ?
router.get('/isClient', (req, res)=> {
    try{
        if(req.user)
            res.send(true)
    }catch (err) {
        console.error(err);
    }

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
    pgConnect.getInscriptionCountByPlanningIdAndMancheId(planning_id, manche_id)
        .then((inscriptions) => {
            res.send(inscriptions);
        })
})

//ajouter l'utilisateur courant à la liste des inscrits dans une manche
router.post('/manches/inscription/:planning_id/:manche_id', (req, res)=>{
    if(req.user.id) {
        const current_user = req.user.id;
        let manche_id = req.params.manche_id;
        let planning_id = req.params.planning_id;
        pgConnect.insertUserToInscription(current_user, manche_id, planning_id)
            .then((inscription) => {
                res.send(inscription);
            })
    }
    else{
        console.log("ERROR LOG : planning-router.js => router.post add current user to registered people for a manche");
    }
})

router.post('/manches', (req, res)=>{
    const new_manche = req.body;
    const manche_json = {id:v4(), name:new_manche.name, ordre:new_manche.ordre, planning_id:new_manche.planning};
    pgConnect.insertManche(manche_json)
        .then((manche) => {
            res.send(manche);
        })
})

module.exports={
    planningRouter:router
}