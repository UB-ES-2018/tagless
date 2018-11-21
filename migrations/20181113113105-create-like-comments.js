'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Like_comments', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        userId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        comment_id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
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
    }).then(function() {
        return queryInterface.sequelize.query(
            'ALTER TABLE Like_comments ADD UNIQUE unique_index (userId, comment_id)'
        );
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Like_comments');
  }
};