'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Orders', [
      {
       userId:"1",
       restaurantId:"1",
       orderTotal:"500",
       deliveryStatus:"pending",   
      },
      {
        userId:"1",
        restaurantId:"2",
        orderTotal:"360",
        deliveryStatus:"succeed",   
       },
       {
        userId:"2",
        restaurantId:"1",
        orderTotal:"579",
        deliveryStatus:"succeed",   
       },
       {
        userId:"2",
        restaurantId:"2",
        orderTotal:"450",
        deliveryStatus:"succeed",   
       },

    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
