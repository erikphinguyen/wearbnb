'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "Users" }
    },
    brandId: {
      type: DataTypes.INTEGER,
      references: { model: "Brands" }
    },
    review: DataTypes.STRING
  }, {});
  Review.associate = function (models) {
    Review.belongsTo(models.User, { foreignKey: "userId" })
    Review.belongsTo(models.Brand, { foreignKey: "brandId" })
  };
  return Review;
};
