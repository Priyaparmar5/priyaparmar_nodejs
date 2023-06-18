    const association = require('../controllers/association.controller.js');

    const router =  require("express").Router();

    router.post("/add",association.many);
    router.get("/add",association.courses);
    router.post("/add",association.many);


    // app.get("/select" ,(req,res)=>{
    //     res.send("select");
    // });

    module.exports = router;