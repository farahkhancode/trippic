'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Profiles",
      "aboutMe",
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  },

  down: (queryInterface, Sequelize) => {
return queryInterface.removeColumn("Profiles", "aboutMe");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
