'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like_comments = sequelize.define('Like_comments', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        userId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        comment_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        vote: {
            type: DataTypes.INTEGER
        }
    }, {});
    Like_comments.associate = function(models) {
        // associations can be defined here
    };
    return Like_comments;
};