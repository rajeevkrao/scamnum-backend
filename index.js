const express = require("express");
const cors = require("cors");
const Mongo = require("./modules/db")
require('dotenv').config();

let mongo = new Mongo();

mongo.connect();

const app = express();

app.use(cors({credentials: true,origin:
    [
        'http://127.0.0.1:5173',
        'http://localhost:5173',
        'https://scamnum.vercel.app'
    ]
}))


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'))
app.use(express.static('dist'))

//Uncomment this section to Enable CORS
/* app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); */

app.get('/api/getnums',async(req,res)=>{
    console.log("ORIGIN: ",req.get('host'))
    res.json(await mongo.getnums())
})

app.listen(5000,()=>{
    console.log("Site is Online")
})