const express = require('express');
const {v4} = require('uuid');
const router = express.Router();
const pgConnect = require('../pgConnect');


router.post('/', (req, res) => {
    let {clientId, planningId, mancheId} = req.body;
    if (!clientId)
        clientId = req.user.id;
    const inscription = {clientId: clientId, planningId: planningId, mancheId: mancheId};
    pgConnect.insertUserToInscription(inscription)
        .then(r => res.send(r));
})


module.exports = {
    inscriptionRouter: router
}