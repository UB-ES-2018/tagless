'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      email: {
        type: DataTypes.STRING
      },
      username: {
        type: DataTypes.STRING
      },
      pass: {
        type: DataTypes.STRING
      },
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
      pictureLink: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      privacity: {
        defaultValue: 0,
        type: DataTypes.INTEGER
      },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};