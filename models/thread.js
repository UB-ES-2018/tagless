'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('Thread', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      userId: DataTypes.INTEGER,
      userName: DataTypes.STRING,
      title: DataTypes.STRING,
      comunity: DataTypes.STRING,
      description: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      updatedAt:{
          type: DataTypes.DATE,
          allowNull: false,
      } 
  }, {});
  Thread.associate = function(models) {
    // associations can be defined here
      Thread.hasMany(models.like,{
          foreignKey: 'like_id',
          as: 'likes',
      })
  };
  return Thread;
};