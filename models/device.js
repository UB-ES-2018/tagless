'use strict';
module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      title: {
          type: DataTypes.STRING
      },
      success: {
          type: DataTypes.INTEGER
      },
      username: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.STRING
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
  }, {});
  Device.associate = function(models) {
    // associations can be defined here
  };
  return Device;
};