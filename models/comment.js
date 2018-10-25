'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    userId: {
          type: DataTypes.INTEGER
    },
    replyId: {
      type: DataTypes.INTEGER
    },
    threadId: {
      type: DataTypes.INTEGER
    },
    body: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
      },
    edited: {
      type: DataTypes.BOOLEAN,
      value: false
      }
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};