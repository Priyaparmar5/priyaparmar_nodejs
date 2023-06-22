'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Menu.belongsTo(models.Restaurants,{foreignKey:'restaurantId'})

    }
  }
  Menu.init({
    restaurantId: DataTypes.INTEGER,
    itemName: DataTypes.STRING,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};