'use strict';
module.exports = (sequelize, DataTypes) => {
  const comunity = sequelize.define('comunity', {
    
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    comunityName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
  }, {});
  comunity.associate = function(models) {
    // associations can be defined here
  };
  return comunity;
};