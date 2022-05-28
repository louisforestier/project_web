const express = require("express");
const router = express.Router();

const {clientRouter} = require("./client-router");
const {planningRouter} = require("./planning-router");
const {inscriptionRouter} = require("./inscription-router");

router.use("/clients",clientRouter);
router.use("/plannings", planningRouter);
router.use("/inscriptions", inscriptionRouter);

module.exports = {
    apiRouter:router
};