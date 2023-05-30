    const association = require('../controllers/association.controller.js');

    const router =  require("express").Router();

    router.post("/add",association.add);

    router.get("/all",association.getAll);
    router.get("/getone/:id", association.getOne);

    router.get("/one-to-one", association.oneToOne);

  //  router.get("/query", association.rawQueryUser);

    router.put("/:id", association.update);

    router.delete("/:id", association.deletep);

    // app.get("/select" ,(req,res)=>{
    //     res.send("select");
    // });

    module.exports = router;