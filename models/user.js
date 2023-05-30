"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Contact,{foreignKey:'userId',as:"contactDetails"})

    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
       // defaultValue: "Priya",
      },
      lastName: {
        type: DataTypes.STRING,
       // defaultValue: "Parmar",
      },
      email: {
        type: DataTypes.STRING,
        //defaultValue: "parmar@gmail.com",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
