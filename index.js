const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const db = require("./models");

const router = require("./routes/association.routes")

app.use(router)


app.listen(3001,()=>{
    console.log("server is running...");
    });
