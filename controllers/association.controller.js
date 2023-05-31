const { QueryTypes } = require('sequelize');
const db = require('../models');
const User = db.User;
const Contact = db.Contact;
const Op = db.Sequelize.Op;

const oneToOne = async (req, res) => {
  try {
    const { firstName, lastName, email, parmanent_address, current_address } = req.body;

    console.log(req.body,"reqqqq");
    const user = await User.create({
      
      ...req.body
    }, 
    {
      include:{model:Contact},
    }
    );
    console.log("user",user);
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const oneToMany = async (req, res) => {
  try {
    const { firstName, lastName, email, parmanent_address, current_address } = req.body;

    console.log(req.body,"reqqqq");
    const user = await User.create({
    
      ...req.body
    }, 
    {
      include:{model:Contact},
    }
    );
    console.log("user",user);
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const oneToOne = async (req, res) => {
//   try {
//     var data = await User.create(
//       {firstName:req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
    
//       Contact :{
//         parmanent_address : req.body.parmanent_address,
//         current_address :  req.body.current_address
//       }
//     })
//     // if(data && data.id){
//     //     await Contact.create({parmanent_address:"fi", current_address:"indian","user_id":data.id});
//     // }

//    // var data = await User.findAll({});
//     res.status(200).json({ data: data });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getAll = async (req, res) => {
  try {
    
    let data = await User.findAll({
      attributes:['firstName','lastName'],
      include:[{
        model:Contact,
        attributes:['parmanent_address','current_address','user_id']
      }],

    });
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await User.findAll({ where: { id: id } });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
  try {
    let id = req.params.id;
    let user_id = req.params.user_id;
    let data = await User.update(req.body,{ where: { id: id } });
    let userdata = await Contact.update(req.body.Contact,{ where: { user_id: user_id } });

    console.log(data,"updatee");
    res.status(200).send(data,userdata);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletep = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await User.destroy({ where: { id: id } });
    res.status(200).send("data is deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const add = async (req, res) => {
  try {
    let data = req.body;
    console.log(data,"datata");
    const info = await User.create(data);
    console.log(info,"infoo");
    res.status(200).json({ data: info });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const add_contact = async (req, res) => {
  try {
    let data = req.body;
    console.log(data,"datata");
    const info = await Contact.create(data);
    console.log(info,"infoo");
    res.status(200).json({ data: info });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// const rawQueryUser = async (req, res) => {
//   try {
//     const users = await db.sequelize.query(
//       {
//         bind: { id: '1' },
//         type: QueryTypes.SELECT,
//       }
//     );
//     res.status(200).json({ data: users });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

module.exports = {
  add,
  getAll,
  getOne,
  update,
  deletep,
  oneToOne,
  add_contact,
  oneToMany
  //rawQueryUser,
};
