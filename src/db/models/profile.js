'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    username: {
       type: DataTypes.STRING,
       allowNull: false
     },
     locationId: {
     type: DataTypes.INTEGER,
     allowNull: false
   },
     userId: {
     type: DataTypes.INTEGER,
     allowNull: false
   }
  }, {});
  Profile.associate = function(models) {
    Profile.belongsTo(models.Location, {
          foreignKey: "locationId"
        });
    Profile.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE"
      });
    // associations can be defined here
  };
  return Profile;
};
