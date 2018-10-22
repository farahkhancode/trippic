const locationQueries = require("../db/queries.locations.js");
const Authorizer = require("../policies/location");

module.exports = {
  index(req, res, next){
    locationQueries.getAllLocations((err, locations) => {

     if(err){
       res.redirect(500, "static/index");
     } else {
       res.render("locations/index", {locations});
     }
   })
},

new(req, res, next){
 // #2
     const authorized = new Authorizer(req.user).new();

     if(authorized) {
       res.render("locations/new");
     } else {
       req.flash("notice", "You are not authorized to do that.");
       res.redirect("/locations");
     }
   },


   create(req, res, next){

    // #1
        const authorized = new Authorizer(req.user).create();

    // #2
        if(authorized) {
          let newLocation = {
            name: req.body.name,
            id: req.body.id
          };
          locationQueries.addLocation(newLocation, (err, location) => {
            if(err){
              res.redirect(500, "/locations/new");
            } else {
              res.redirect(303, `/locations/${location.id}`);
            }
          });

        } else {

    // #3
          req.flash("notice", "You are not authorized to do that.");
          res.redirect("/locations");
        }
      },


   show(req, res, next){
     locationQueries.getLocation(req.params.id, (err, location) => {
       if(err || location == null){
         res.redirect(404, "/");
       } else {
         res.render("locations/show", {location});
       }
     });
   },


   destroy(req, res, next){
        locationQueries.deleteLocation(req.params.id, (err, location) => {
          if(err){
            res.redirect(err, `/locations/${location.id}`)
          } else {
            res.redirect(303, "/locations")
          }
        });
      }


}
