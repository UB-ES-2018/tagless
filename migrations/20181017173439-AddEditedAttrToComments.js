'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Comments', 'edited', { type: Sequelize.BOOLEAN });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('Comments', 'edited');
  }
};
