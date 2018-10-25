'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Comments', 'replyId', { type: Sequelize.INTEGER });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('Comments', 'replyId');
  }
};
