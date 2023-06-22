const association = require('../controllers/user.controller.js');

const routers =  require("express").Router();


routers.post("/user/add",association.addUser);    
routers.get("/user/findall",association.findall);    


module.exports = routers;