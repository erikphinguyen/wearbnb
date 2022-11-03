'use strict';
module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    userId: DataTypes.INTEGER
  }, {});
  Video.associate = function(models) {
    Video.belongsTo(models.User, {foreignKey: "userId"})
  };
  return Video;
};
