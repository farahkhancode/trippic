'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.addColumn(
    "Profiles",
    "link",
    {
      type: Sequelize.STRING
    }
  );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Profiles", "link");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
