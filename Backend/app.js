const fs=require('fs')
const path=require('path')
const express = require("express");
const helmet=require('helmet')
const cors = require("cors");
const app = express();
const morgan=require('morgan')
const compression=require('compression')
const bodyparser=require('body-parser')
const videoroutes=require('./routes/video')

app.use(cors());



//PRODUCTION
const access=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})

app.use(helmet())
app.use(compression())//compresses file size downloded from server //must if using heroku
app.use(morgan('combined',{stream:access}))//logging requests

app.use(bodyparser.json())





//CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    next();
  });

app.use('/video',videoroutes)

const connect = () => {
  app.listen(process.env.PORT||8080);
  console.log("Connected!");
};

connect();
