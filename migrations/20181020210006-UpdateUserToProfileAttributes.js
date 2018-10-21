'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.addColumn('Users', 'pictureLink', { type: Sequelize.STRING});
    queryInterface.addColumn('Users', 'description', { type: Sequelize.STRING});
  },

  down: (queryInterface, Sequelize) => {

    queryInterface.removeColumn('Users', 'pictureLink');
    queryInterface.removeColumn('Users', 'description');
  }
};
