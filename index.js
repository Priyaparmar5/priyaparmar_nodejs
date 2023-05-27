const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//const mysql = require("mysql2");

const db = require("./models");

db.sequelize.sync().then((req)=>{

app.listen(3001,()=>{
    console.log("server is running...");
    });
});