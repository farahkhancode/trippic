'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Profiles",
      "avatar",
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    );
  },

  down: (queryInterface, Sequelize) => {
return queryInterface.removeColumn("Profiles", "avatar");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
