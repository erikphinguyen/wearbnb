'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
      {
        userId: "1",
        brandId: "1",
        review: "I loved working with them!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "2",
        brandId: "1",
        review: "Everyone was awesome!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "3",
        brandId: "1",
        review: "My favorite brand - coolest team ever!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "1",
        brandId: "2",
        review: "Very professional, loved it!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "2",
        brandId: "2",
        review: "Would do this again!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "3",
        brandId: "2",
        review: "Loved having the opportunity to work with the entire team!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "1",
        brandId: "3",
        review: "Fantastic experience, would want to do it again!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "2",
        brandId: "3",
        review: "Superb!  Very professional and fun!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "3",
        brandId: "3",
        review: "Can't believe all the fun I had!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "1",
        brandId: "4",
        review: "Very professional, loved it!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "2",
        brandId: "4",
        review: "Would do this again!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "3",
        brandId: "4",
        review: "Loved having the opportunity to work with the entire team!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "1",
        brandId: "5",
        review: "I loved working with them!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "2",
        brandId: "5",
        review: "Everyone was awesome!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "3",
        brandId: "5",
        review: "My favorite brand - coolest team ever!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "1",
        brandId: "6",
        review: "Fantastic experience, would want to do it again!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "2",
        brandId: "6",
        review: "Superb!  Very professional and fun!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "3",
        brandId: "6",
        review: "Can't believe all the fun I had!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "1",
        brandId: "7",
        review: "Very professional, loved it!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "2",
        brandId: "7",
        review: "Would do this again!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "3",
        brandId: "7",
        review: "Loved having the opportunity to work with the entire team!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "1",
        brandId: "8",
        review: "I loved working with them!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "2",
        brandId: "8",
        review: "Everyone was awesome!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "3",
        brandId: "8",
        review: "My favorite brand - coolest team ever!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "1",
        brandId: "9",
        review: "Fantastic experience, would want to do it again!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "2",
        brandId: "9",
        review: "Superb!  Very professional and fun!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "3",
        brandId: "9",
        review: "Can't believe all the fun I had!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "1",
        brandId: "10",
        review: "Fantastic experience, would want to do it again!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "1",
        brandId: "11",
        review: "Superb!  Very professional and fun!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: "1",
        brandId: "12",
        review: "Can't believe all the fun I had!",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {})
  }
};
