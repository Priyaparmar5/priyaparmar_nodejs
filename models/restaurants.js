'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Restaurants.hasMany(models.Order,{foreignKey:'restaurantId'}),
      Restaurants.hasMany(models.Menu,{foreignKey:'restaurantId'})
      // Restaurants.belongsToMany(models.User, {
      //   through: "Rating",
      //   foreignKey:"restaurantId"
      // });
    }
  }
  Restaurants.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    contact: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Restaurants',
  });
  return Restaurants;
};