'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.addColumn('Comments', 'userId', { type: Sequelize.STRING });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('Comments', 'userId');
  }
};
