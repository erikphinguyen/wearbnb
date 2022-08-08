'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Brands', [
      {
        userId: "1",
        brandImg: "https://1000logos.net/wp-content/uploads/2017/05/North-Face-Logo.png",
        name: "The North Face",
        address: "2701 Harbor Bay Pkwy",
        city: "Alameda, CA",
        country: "USA",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Brands', null, {});
  }
};
