const express = require("express");
const router = express.Router();

const {inscriptionRouter} = require('./inscription-router')

router.use((req, res, next)=>{
    if (req.user){
        next();
    }
    else res.redirect(401,'/');
})

router.use("/inscriptions",inscriptionRouter);

module.exports = {
    clientRouter:router
};