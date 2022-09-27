'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    brandId: {
      type: DataTypes.INTEGER,
      references: { model: "Brands" }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "Users" }
    },
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    price: DataTypes.FLOAT,
    totalPrice: DataTypes.FLOAT
  }, {});
  Booking.associate = function (models) {
    Booking.belongsTo(models.Brand, { foreignKey: "brandId" })
    Booking.belognsTo(models.User, { foreignKey: "userId" })
  };
  return Booking;
};
