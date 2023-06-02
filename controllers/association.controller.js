const { QueryTypes } = require('sequelize');
//const { sequelize } = require('')
const db = require('../models');
const User = db.User;
const Contact = db.Contact;
const Op = db.Sequelize.Op;


const manyToMany = async (req, res) => {  
  try {
   // const { firstName, lastName, email, parmanent_address, current_address } = req.body;
   
    const user = await User.create(
      {
        ...req.body
        // firstName,
        // lastName,
        // email,
        // Contacts: [{ parmanent_address, current_address }],
      },
      { include: {model:Contact} }
    );

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getAll = async (req, res) => {
  try {
    
    let data = await User.findAll({
    //  attributes:['firstName','lastName'],
      include:[{
        model:Contact,
        
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
    console.log(userdata,'userdataa');
    res.status(200).send(data);
    res.status(200).send(userdata);
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


const rawQueryUser = async (req, res) => {
  try {
    const users = await db.sequelize.query(
      'select * from User',
      {
        model:User,
        type: QueryTypes.SELECT,
        plain:false,
        mapToModel: true
      }
    );
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  add,
  getAll,
  getOne,
  update,
  deletep,
  //oneToOne,
  add_contact,
  manyToMany,
  rawQueryUser,
};
