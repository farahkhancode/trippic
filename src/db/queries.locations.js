const Location = require("./models").Location;
const Profile = require("./models").Profile;

module.exports = {

//#1
  getAllLocations(callback){
    return Location.all()

//#2
    .then((locations) => {
      callback(null, locations);
    })
    .catch((err) => {
      callback(err);
    })
  },


  addLocation(newLocation, callback){
      return Location.create({
        name: newLocation.name,
        id: newLocation.id
      })
      .then((location) => {
        callback(null, location);
      })
      .catch((err) => {
        callback(err);
      })
    },

    getLocation(id, callback){
      return Location.findById(id, {
//#3
        include: [{
           model: Profile,
           as: "profiles"
        }]
      })
       .then((location) => {
         callback(null, location);
       })
       .catch((err) => {
         callback(err);
       })
     },

   deleteLocation(id, callback){
    return Location.destroy({
      where: {id}
    })
    .then((location) => {
      callback(null, location);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
