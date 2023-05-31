    const association = require('../controllers/association.controller.js');

    const router =  require("express").Router();

    router.post("/add",association.add);

    router.post("/add-contact",association.add_contact);

    router.get("/all",association.getAll);
    router.get("/getone/:id", association.getOne);

    router.post("/one-to-one", association.oneToOne);

    router.post("/one-to-many", association.oneToMany);

  //  router.get("/query", association.rawQueryUser);

    router.put("/:id", association.update);

    router.delete("/:id", association.deletep);

    // app.get("/select" ,(req,res)=>{
    //     res.send("select");
    // });

    module.exports = router;