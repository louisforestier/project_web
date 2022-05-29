const express = require("express");
const router = express.Router();

const {visitorClientRouter} = require("./client-router");
const {visitorPlanningRouter} = require("./planning-router");

router.use("/clients",visitorClientRouter);
router.use("/plannings", visitorPlanningRouter);

module.exports = {
    visitorRouter:router
};