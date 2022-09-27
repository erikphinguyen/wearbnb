'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    brandId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    price: DataTypes.FLOAT,
    totalPrice: DataTypes.FLOAT
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
  };
  return Booking;
};