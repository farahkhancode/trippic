'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define('Profile', {
    username: {
       type: DataTypes.STRING,
       allowNull: false
     },
     avatar: {
     type: DataTypes.STRING,
     allowNull: false
     },
     pic1: {
      type: DataTypes.STRING,
      allowNull: false
     },
     pic2: {
      type: DataTypes.STRING,
      allowNull: false
     },
     pic3: {
      type: DataTypes.STRING,
      allowNull: false
     },
     pic4: {
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
