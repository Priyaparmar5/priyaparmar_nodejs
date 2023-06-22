  const { QueryTypes } = require("sequelize");
  const db = require("../models");
  const User = db.User;
  const Cart = db.Cart;
  const Op = db.Sequelize.Op;
    
  const addUser = async (req, res) => {
    try {
      console.log(req.body,"reqqq");
      const user = await User.create(
        {
         ...req.body
        },
      );
      console.log(user, "userrr");

      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
  const findall = async (req, res) => {
    const { page = 1, perPage = 3, search } = req.query;
     console.log(req.query,"reqq...");
    try {
      const offset = (parseInt(page) - 1) * parseInt(perPage);
      const limit = parseInt(perPage);
      //let data = await User.findAll(queryOptions);
      const query = User.findAndCountAll({
        where: {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            // { email: { [Op.like]: `%${search}%` } },
            // { password: { [Op.like]: `%${search}%` } },
            { phone: { [Op.like]: `%${search}%` } },
          ],
        },
        
        include:[],
     //   order: [[sortField, sortOrder]],
        limit,
        offset,
      });
  
      const result = await query;
      const { count, rows } = result;
  
      res.status(200).json({
        data: rows,
        total: count,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {
    
    addUser,
    findall
  };
