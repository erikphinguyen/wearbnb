'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    brandId: {
      type: DataTypes.INTEGER,
      references: { model: "Brands" }
    },
    imageUrl: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {});
  Image.associate = function (models) {
    Image.belongsTo(models.Brand, { foreignKey: "brandId" })
  };
  return Image;
};
