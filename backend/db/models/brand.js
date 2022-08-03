'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    userId: DataTypes.INTEGER,
    brandImg: DataTypes.STRING,
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING
  }, {});
  Brand.associate = function (models) {
    Brand.belongsTo(models.User, { foreignKey: "userId" })
    // Brand.hasMany(models.Images, )
  };
  return Brand;
};
