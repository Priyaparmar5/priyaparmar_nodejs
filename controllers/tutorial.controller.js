const db = require('../models');
const Tutorial =  db.tutorials;
const Op = db.Sequelize.Op;

// exports.create = (req,res) => {

//     if(!req.body.title){
//         res.status(400).send({
//             message: "Content can not be empty!"
//         });
//         return;
//     }
// }

const getAll = async(req,res) =>{

    let data = await Tutorial.findAll({})
    res.status(200).send(data)
}

const getOne = async(req,res) =>{

    let id = req.params.id
    let data = await Tutorial.findAll({ where: {id: id}})
    res.status(200).send(data)
}

const update = async(req,res) =>{

    let id = req.params.id
    let data = await Tutorial.update({ where: {id: id}})
    res.status(200).send(data)
}

const deletep = async(req,res) =>{

    let id = req.params.id
    let data = await Tutorial.destroy({ where: {id: id}})
    res.status(200).send("product is deleted")
}

const add = async(req,res) =>{

    let data = {
        title : req.body.title,
        description : req.body.description,
        published : req.body.published ? req.body.published : false
    }

    const info = await Tutorial.create(data)
   // req.status(200).send(info)
}

// const tutorial = {
//     title : req.body.title,
//     description : req.body.description,
//     published : req.body.published ? req.body.published : false
// };

// Tutorial.create(tutorial)
// .then(data =>{
//     res.send(data);
// })
// .catch(err => {
//     res.status(500).send({
//         message: err.message || "some error occurred"
//     })
// })

module.exports = {
    add,
    getAll,
    getOne,
    update,
    deletep
}