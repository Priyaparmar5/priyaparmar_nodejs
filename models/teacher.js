'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Teacher.belongsToMany(models.Course, {
        through: models.Enrollment,
        foreignKey: 'enrollId',
        constraints: false,
        scope: {
          enrollType: 'Teacher',
        },
      });
      
    }
  }
  Teacher.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Teacher',
  });
  return Teacher;
};