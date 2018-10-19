const Location = require("./models").Location;
const Profile = require("./models").Profile;
const Authorizer = require("../policies/location");

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

     deleteLocation(req, callback){

     // #1
         return Location.findById(req.params.id)
         .then((location) => {

     // #2
           const authorized = new Authorizer(req.user, location).destroy();

           if(authorized) {
     // #3
             location.destroy()
             .then((res) => {
               callback(null, location);
             });

           } else {

     // #4
             req.flash("notice", "You are not authorized to do that.")
             callback(401);
           }
         })
         .catch((err) => {
           callback(err);
         });
       }

}
