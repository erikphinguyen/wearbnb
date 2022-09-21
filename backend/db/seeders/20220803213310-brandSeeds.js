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
        brandImg: "https://logos-world.net/wp-content/uploads/2020/04/Louis-Vuitton-Logo.png",
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
      },
      {
        userId: "1",
        brandImg: "https://logos-world.net/wp-content/uploads/2021/08/Christian-Dior-Symbol.png",
        name: "Christian Dior",
        address: "30 Aenue Montaigne",
        city: "Paris",
        country: "France",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "2",
        brandImg: "https://logos-world.net/wp-content/uploads/2020/08/Burberry-Logo.png",
        name: "Burberry",
        address: "Horseferry House, Horseferry ",
        city: "Westminster, London",
        country: "United Kingdom",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "3",
        brandImg: "https://images.squarespace-cdn.com/content/v1/532313ece4b08487acaec7a2/1622812439178-Y5O14F6257ER48YQ6MLZ/ju0iziSbT5S0jKcAsDgo_a112e28670deb56c8c051a17d962dd0f.png?format=1000w",
        name: "Essentials - Fear of God",
        address: "3940 Laurel Canyon Blvd, Suite 427",
        city: "Studio City, Los Angeles, CA",
        country: "USA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "1",
        brandImg: "https://1000logos.net/wp-content/uploads/2021/11/Nike-Logo-500x281.png",
        name: "Nike",
        address: "One Bowerman Drive",
        city: "Beaverton, OR",
        country: "USA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "2",
        brandImg: "https://uspto.report/TM/86621492/mark",
        name: "Darc Sport",
        address: "23510 Telo Avenue, Unit 2",
        city: "Torrance, CA",
        country: "USA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "3",
        brandImg: "https://logos-world.net/wp-content/uploads/2020/09/Lululemon-Symbol.png",
        name: "lululemon",
        address: "1818 Cornwall Avenue",
        city: "Vancouver, B.C V6J 1C7",
        country: "Canada",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "1",
        brandImg: "https://logolook.net/wp-content/uploads/2021/07/Patagonia-Logo.png",
        name: "Patagonia",
        address: "235 W. Santa Clara",
        city: "Ventura, CA",
        country: "USA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "2",
        brandImg: "https://1000logos.net/wp-content/uploads/2021/05/AllSaints-logo.png",
        name: "AllSaints",
        address: "114 Commercial St.",
        city: "London, England",
        country: "UK",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "3",
        brandImg: "https://logovtor.com/wp-content/uploads/2021/03/burton-snowboards-logo-vector.png",
        name: "Burton",
        address: "80 Industrial Parkway",
        city: "Burlington, VT",
        country: "USA",
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Brands', null, {});
  }
};
