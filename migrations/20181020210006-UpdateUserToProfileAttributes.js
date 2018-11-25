'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Users', 'pictureLink', { type: Sequelize.STRING})
        .then(function() {queryInterface.addColumn('Users', 'description', { type: Sequelize.STRING}) });

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('Users', 'pictureLink')
        .then(function() {queryInterface.removeColumn('Users', 'description')} );
  }
};
