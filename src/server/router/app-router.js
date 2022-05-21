const express = require("express");
const router = express.Router();

const {clientRouter} = require("./client-router");
const {planningRouter} = require("./planning-router");

router.use("/clients",clientRouter);
router.use("/planning", planningRouter);

module.exports = {
    apiRouter:router
};