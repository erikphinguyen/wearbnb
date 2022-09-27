'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Bookings', [
      {
        userId: "1",
        brandId: "1",
        startDate: '2022-10-01',
        endDate: '2022-10-08',
        price: 99.99,
        totalPrice: 909.91
      },
      {
        userId: "2",
        brandId: "2",
        startDate: '2022-10-01',
        endDate: '2022-10-08',
        price: 99.99,
        totalPrice: 909.91
      },
      {
        userId: "3",
        brandId: "3",
        startDate: '2022-10-01',
        endDate: '2022-10-08',
        price: 99.99,
        totalPrice: 909.91
      },
      {
        userId: "1",
        brandId: "4",
        startDate: '2022-10-08',
        endDate: '2022-10-15',
        price: 99.99,
        totalPrice: 909.91
      },
      {
        userId: "2",
        brandId: "5",
        startDate: '2022-11-08',
        endDate: '2022-11-15',
        price: 149.99,
        totalPrice: 1364.91
      },
      {
        userId: "3",
        brandId: "6",
        startDate: '2022-11-08',
        endDate: '2022-11-15',
        price: 149.99,
        totalPrice: 1364.91
      },
      {
        userId: "1",
        brandId: "7",
        startDate: '2022-11-15',
        endDate: '2022-11-22',
        price: 149.99,
        totalPrice: 1364.91
      },
      {
        userId: "2",
        brandId: "8",
        startDate: '2022-11-15',
        endDate: '2022-11-22',
        price: 149.99,
        totalPrice: 1364.91
      },
      {
        userId: "3",
        brandId: "9",
        startDate: '2022-12-15',
        endDate: '2022-12-22',
        price: 199.99,
        totalPrice: 1819.91
      },
      {
        userId: "1",
        brandId: "10",
        startDate: '2022-12-22',
        endDate: '2022-12-29',
        price: 199.99,
        totalPrice: 1819.91
      },
      {
        userId: "2",
        brandId: "11",
        startDate: '2022-12-22',
        endDate: '2022-12-29',
        price: 199.99,
        totalPrice: 1819.91
      },
      {
        userId: "3",
        brandId: "12",
        startDate: '2022-12-22',
        endDate: '2022-12-29',
        price: 199.99,
        totalPrice: 1819.91
      },
      {
        userId: "1",
        brandId: "13",
        startDate: '2022-01-22',
        endDate: '2022-01-29',
        price: 249.99,
        totalPrice: 2274.91
      },
      {
        userId: "2",
        brandId: "14",
        startDate: '2022-01-22',
        endDate: '2022-01-29',
        price: 249.99,
        totalPrice: 2274.91
      },
      {
        userId: "3",
        brandId: "15",
        startDate: '2022-01-22',
        endDate: '2022-01-29',
        price: 249.99,
        totalPrice: 2274.91
      },
      {
        userId: "1",
        brandId: "16",
        startDate: '2022-01-22',
        endDate: '2022-01-29',
        price: 249.99,
        totalPrice: 2274.91
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bookings', null, {})
  }
};
