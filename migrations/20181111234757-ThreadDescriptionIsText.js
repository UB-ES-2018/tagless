'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
    .changeColumn('Threads', 'description', {
      type: Sequelize.TEXT
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
    .changeColumn('Threads', 'description', {
      type: Sequelize.STRING
    });
  }
};
