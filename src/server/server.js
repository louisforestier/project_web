const express = require('express');
const app = express();
const port = 3001;
const fs = require('fs');
let cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.urlencoded());

const pgConnect = require('./pgConnect');
const {apiRouter} = require("./router/app-router");
const {v4} = require("uuid");
app.use(express.json());
app.use('/', express.static('dist'));
app.use('/', express.static('public'));

const expiration_offset = 600000;

app.post('/login',(req,res)=>{
    console.log('post login');
    console.log(req.body);
    const {username,password} = req.body;

    pgConnect.getUserByUsername(username)
        .then((user)=>{
            console.log(user);
            if (user && user.password == password){

                const token = {id:v4(),user:user.id,expiration_time: new Date(Date.now()+expiration_offset)};
                pgConnect.insertToken(token)
                    .then((value) => {
                        console.log(value);
                        res.cookie('MON_TOKEN',value.id);
                        res.redirect('/');
                    })
            }
        });
})


app.use('/*',(req,res,next)=> {
    const tokenID = req.cookies.MON_TOKEN;
    pgConnect.getTokenById(tokenID)
        .then((token)=>{
            console.log(token);
            if (token && Date.now()<token.expiration_time) {
                const userid = token.user_id;
                pgConnect.getUserById(userid)
                    .then((user)=>{
                        req.user = user;
                        console.log("filtre ",req.user);
                        next();
                    })
            } else {
                res.redirect('/login');
            }
        })
})


app.use('/api', apiRouter);

app.get('/*', (req, res) => {
    console.log("user is ",req.user);
    fs.readFile('public/app.html', 'utf8', (err, html) => {
        if (err) {
            console.error(err);
            return;
        } else {
            let result = (process.env.MODE !== "prod")
                ? html
                    .replace('$js', 'http://localhost:1234/index.js')
                    .replace('$css', 'http://localhost:1234/index.css')
                : html
                    .replace('$js', '/index.min.js')
                    .replace('$css', '/index.min.css')
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(result);
        }
    })
})


app.listen(port,() => {
    console.log(`Example app listening in port ${port}`);
})