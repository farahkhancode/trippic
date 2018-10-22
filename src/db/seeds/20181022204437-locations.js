'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Locations',
    [ {name: 'Rome, Italy', id: 1},
      {name: 'London, UK', id: 2},
      {name: 'Paris, France', id: 3},
      {name: 'Hawaii, USA', id: 4}
    ], {});
      },


  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Locations', null, {});

  }
};
