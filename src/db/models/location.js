'use strict';
module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define('Location', {
    name: {
       type: DataTypes.STRING,
       allowNull: false
     }
  }, {});
  Location.associate = function(models) {
    Location.hasMany(models.Profile, {
           foreignKey: "locationId",
           as: "profiles"
         });
    // associations can be defined here
  };
  return Location;
};
