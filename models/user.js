'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Address,{foreignKey:'userId'});
      User.hasMany(models.Order,{foreignKey:'userId'});
      User.belongsToMany(models.Restaurants, {
        through: "User_Restaurant",
        foreignKey:"userId"
      });
      // User.belongsToMany(models.Restaurants, {
      //   through: "Rating",
      //   foreignKey:"userId"
      // });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};