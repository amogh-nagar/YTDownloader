const express = require("express");
const cors = require("cors");
const app = express();
const bodyparser=require('body-parser')
const videoroutes=require('./routes/video')

app.use(cors());

app.use(bodyparser.json())

console.log('backend')


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
  });

app.use('/video',videoroutes)

const connect = () => {
  app.listen(8080);
  console.log("Connected!");
};

connect();
