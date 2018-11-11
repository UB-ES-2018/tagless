'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thread = sequelize.define('Thread', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
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