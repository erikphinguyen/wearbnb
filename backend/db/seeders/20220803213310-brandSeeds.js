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
      },
      {
        userId: "2",
        brandImg: "https://indiacityblog.com/wp-content/uploads/2020/04/Turbologo-1200x900.png",
        name: "Louis Vuitton",
        address: "LVMH Moët Hennessy - Louis Vuitton, 22, avenue Montaigne ",
        city: "Paris",
        country: "France",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "3",
        brandImg: "https://logos-world.net/wp-content/uploads/2020/06/Cartier-Symbol.png",
        name: "Cartier",
        address: "17 Rue du Faubourg Saint-Honoré",
        city: "Paris",
        country: "France",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Brands', null, {});
  }
};
