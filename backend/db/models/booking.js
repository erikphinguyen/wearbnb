'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    brandId: {
      type: DataTypes.INTEGER,
      references: { model: "Brands" },
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "Users" },
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE
    },
    price: {
      type: DataTypes.FLOAT
    },
    totalPrice: {
      type: DataTypes.FLOAT
    }
  }, {});
  Booking.associate = function (models) {
    Booking.belongsTo(models.Brand, { foreignKey: "brandId" })
    Booking.belongsTo(models.User, { foreignKey: "userId" })
  };
  return Booking;
};
