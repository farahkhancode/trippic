'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
       isEmail: { msg: "must be a valid email" }
     }
   },
   password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
     type: DataTypes.STRING,
     allowNull: false,
     defaultValue: "member"
   }
  }, {});

  User.associate = function(models) {
    User.hasOne(models.Profile, {
      foreignKey: "userId",
      as: "profiles"
    });
    
    User.prototype.isAdmin = function() {
     return this.role === "admin";
   };
    // associations can be defined here
  };
  return User;
};
