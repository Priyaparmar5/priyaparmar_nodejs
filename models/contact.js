'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Contact.belongsToMany(models.User, {
        through: "user_contacts",
        //foreignKey: "user_id",
      });
      // define association here
    }
  }
  Contact.init({
    parmanent_address: DataTypes.STRING,
    current_address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};