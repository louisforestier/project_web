const express = require("express");
const router = express.Router();

const {adminClientRouter} = require('./client-router')
const {adminPlanningRouter} = require('./planning-router')

router.use((req, res, next)=>{
    if(req.user && req.user.admin)
        next();
    else if (req.user)
        res.redirect(403,'/');
    else res.redirect(401,'/');
})

router.use("/clients",adminClientRouter);
router.use("/plannings",adminPlanningRouter);

module.exports = {
    adminRouter:router
};