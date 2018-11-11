'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
      },
      userId: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      thread_id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER
      }
      createdAt: {
          allowNull: false,
          type: Sequelize.DATE
      },
      updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
      },
      vote: {
          type: Sequelize.INTEGER
      }
  });
},


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
  Like.associate = function(models) {
    // associations can be defined here
  };
  return Like;
};