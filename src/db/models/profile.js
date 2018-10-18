'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    username: {
       type: DataTypes.STRING,
       allowNull: false
     }
  }, {});
  Profile.associate = function(models) {
    Profile.belongsTo(models.Location, {
          foreignKey: "locationId"
        });
    // associations can be defined here
  };
  return Profile;
};
