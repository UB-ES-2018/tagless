'use strict';
module.exports = (sequelize, DataTypes) => {
  const comunity = sequelize.define('comunity', {
    comunityName: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  comunity.associate = function(models) {
    // associations can be defined here
  };
  return comunity;
};