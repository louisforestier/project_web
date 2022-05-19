const express = require("express");
const router = express.Router();

const {clientRouter} = require("./client-router");

router.use("/clients",clientRouter);


module.exports = {
    apiRouter:router
};