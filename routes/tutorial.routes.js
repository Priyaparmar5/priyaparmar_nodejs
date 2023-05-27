    const tutorials = require('../controllers/tutorial.controller.js');

    const router =  require("express").Router();

    router.post("/add",tutorials.add);

    router.get("/all",tutorials.getAll);
    router.get("/getone", tutorials.getOne);

    router.put("/:id", tutorials.update);

    router.delete("/:id", tutorials.deletep);

    // app.get("/select" ,(req,res)=>{
    //     res.send("select");
    // });

   module.exports = router;