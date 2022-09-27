'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [
      {
        userId: "1",
        brandId: "1",
      },
      {
        userId: "2",
        brandId: "2",
      },
      {
        userId: "3",
        brandId: "3",
      },
      {
        userId: "1",
        brandId: "4",
      },
      {
        userId: "2",
        brandId: "5",
      },
      {
        userId: "3",
        brandId: "6",
      },
      {
        userId: "1",
        brandId: "7",
      },
      {
        userId: "2",
        brandId: "8",
      },
      {
        userId: "3",
        brandId: "9",
      },
      {
        userId: "1",
        brandId: "10",
      },
      {
        userId: "2",
        brandId: "11",
      },
      {
        userId: "3",
        brandId: "12",
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
