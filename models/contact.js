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
      // define association here
      console.log('Category associated with: user');
      Contact.belongsTo(models.User,{foreignKey:'user_id'})
    }
  }
  Contact.init({
    parmanent_address: DataTypes.STRING,
    current_address: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};