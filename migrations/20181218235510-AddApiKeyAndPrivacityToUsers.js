'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'apiKey', {type: Sequelize.STRING})
        .then(function() {
          return queryInterface.addColumn('Users', 'privacity', {type: Sequelize.INTEGER});
        });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'apiKey')
        .then(function() { return queryInterface.removeColumn('Users', 'privacity')} );
  }
};
