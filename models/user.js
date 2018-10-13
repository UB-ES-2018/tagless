'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
      userid: DataTypes.INTEGER,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      pass: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};