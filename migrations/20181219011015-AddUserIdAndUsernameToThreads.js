'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Threads', 'userId', {type: Sequelize.INTEGER})
        .then(function() {
          return queryInterface.addColumn('Threads', 'userName', {type: Sequelize.STRING});
        });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Threads', 'userId')
        .then(function() { return queryInterface.removeColumn('Threads', 'userName')} );
  }
};
