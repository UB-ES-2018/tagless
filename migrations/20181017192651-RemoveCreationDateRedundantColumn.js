'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('Comments', 'creationDate');
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Comments', 'creationDate', { type: Sequelize.DATE });
  }
};
