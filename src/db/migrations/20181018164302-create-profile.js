'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      username: {
        type: Sequelize.STRING,
        allowNull:false
      },
      
      locationId: {
         type: Sequelize.INTEGER,// delete post if parent topic is deleted
         allowNull: false,    // validation to prevent null value
         references: {        // association information
           model: "Locations",   // table name
           key: "id",         // attribute to use
           as: "locationId"      // reference as topicId
         }
       },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Profiles');
  }
};
