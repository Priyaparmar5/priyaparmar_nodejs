const { Sequelize } = require("sequelize");
//const sequelize = new Sequelize('::memory:');

module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define('Users',{
        name:{
            type: Sequelize.STRING
        },
        color:{
            type: Sequelize.STRING,
            defaultValue: 'green'
        },
        age:{
            type : Sequelize.INTEGER
        }
    }) 
    return Tutorial;
}