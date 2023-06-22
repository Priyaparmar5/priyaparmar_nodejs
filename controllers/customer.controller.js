const { QueryTypes } = require("sequelize");
const db = require("../models");
const bcrypt = require("bcrypt");
const Customer = db.Customer;
const Cart = db.Cart;
const Address = db.Address;

const add = async (req, res) => {
  try {
    console.log(req.body, "req.body;");
    const { customerData, addressData } = req.body;
    const hashedPassword = await bcrypt.hash(customerData.password, 10);
    console.log(hashedPassword, "hash");
    const customer = await Customer.create(
      {
        ...customerData,
        password: hashedPassword,
      },
      { include: [Cart, Address] }
    );
    console.log(customer, "customer");
    const address = await Address.create({
      ...addressData,
      customerId: customer.id,
    });
    console.log(address, "address");
    res.status(200).json({ data: customer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkEmail = async (req, res) => {
  try {
    const { email } = req.query;

    const existingUser = await Customer.findOne({ where: { email } });

    if (existingUser) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  add,
  checkEmail
};
