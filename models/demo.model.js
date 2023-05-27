const { Sequelize } = require("sequelize");
//const sequelize = new Sequelize('::memory:');

module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define('tutoral',{
        title:{
            type: Sequelize.STRING
        },
        description:{
            type: Sequelize.STRING
        },
        published:{
            type : Sequelize.BOOLEAN
        }
    }) 
    return Tutorial;
}