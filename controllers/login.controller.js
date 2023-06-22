// routes/authRoutes.js

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const Customer = db.Customer;

const login = async (req, res) => {
  try {
    const { email, password } = req.body.data;
    console.log(req.body.data, "consoleeeeeeeeee");
    const user = await Customer.findOne({ where: { email } });
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (user && passwordMatch) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        "secret"
      );
      console.log(token, "tokennn");
      res.json({
        auth: true,
        token: token,
        email: email,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login,
};
