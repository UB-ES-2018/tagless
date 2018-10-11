'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
    creationDate: DataTypes.DATE,
    body: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    testAttr: DataTypes.STRING,
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};