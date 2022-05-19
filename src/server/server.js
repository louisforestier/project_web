const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');
let cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.urlencoded());

const pgConnect = require('./pgConnect');
const {apiRouter,users,comments} = require("./router/app-router");
const {v4} = require("uuid");
app.use(express.json());
app.use('/', express.static('dist'));
app.use('/', express.static('public'));
