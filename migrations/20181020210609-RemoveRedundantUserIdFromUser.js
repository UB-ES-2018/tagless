'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('Users', 'userid');
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Users', 'userid', { type: Sequelize.INTEGER });
  }
};
