const express = require('express');
const app = express();
const port = 3002;
const fs = require('fs');
let cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.urlencoded());

const pgConnect = require('./pgConnect');
const {apiRouter} = require("./router/app-router");
const {v4} = require("uuid");
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(express.json());
app.use('/', express.static('dist'));
app.use('/', express.static('public'));

const expiration_offset = 600000;

app.post('/login',(req,res)=>{
    console.log('post login');
    console.log(req.body);
    const {username,password} = req.body;
    pgConnect.getClientByUsername(username)
        .then((client)=>{
            console.log(client);
            if (client){
                bcrypt.compare(password,client.password,(err,result)=>{
                    if (err)
                        throw err;
                    console.log("bcrypt compare");
                    if (result){
                        console.log("authentification success");
                        const token = {id:v4(),client:client.id,expiration_time: new Date(Date.now()+expiration_offset)};
                        pgConnect.insertToken(token)
                            .then((value) => {
                                console.log(value);
                                res.cookie('MON_TOKEN',value.id);
                                res.redirect('/');
                            })
                    }
                    else{
                        console.log("authentification failed.");
                        res.redirect('/signin');
                    }
                })
            }
        });
})


app.use('/*',(req,res,next)=> {
    const tokenID = req.cookies.MON_TOKEN;
    pgConnect.getTokenById(tokenID)
        .then((token)=>{
            console.log(token);
            if (token ) {
                if (Date.now()<token.expiration_time) {
                    const clientId = token.client_id;
                    pgConnect.getClientById(clientId)
                        .then((user) => {
                            req.user = user;
                            console.log("filtre",req.originalUrl);
                            console.log("filtre ", req.user);
                            next();
                        })
                } else {
                    pgConnect.deleteTokenById(token.id)
                        .then(()=>next())
                }
            } else {
                next();
            }
        })
})


app.use('/api', apiRouter);


app.get('/*', (req, res) => {
    console.log("user is ",req.user);
    fs.readFile('public/home.html', 'utf8', (err, html) => {
        if (err) {
            console.error(err);
            return;
        } else {
            let filename = 'visitor_app';
            if (req.user)
                if (req.user.admin)
                    filename = 'admin_app';
                else filename = 'client_app';
            console.log(filename);
            let result = (process.env.MODE !== "prod")
                ? html
                    .replace('$js', 'http://localhost:1234/'+filename+'.js')
                    .replace('$css', 'http://localhost:1234/client_app.css')
                : html
                    .replace('$js', '/'+filename+'.min.js')
                    .replace('$css', '/client_app.min.css')
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(result);
        }
    })
})


app.listen(port,() => {
    console.log(`Example app listening in port ${port}`);
})