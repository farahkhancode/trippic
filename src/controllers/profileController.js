const profileQueries = require("../db/queries.profiles.js");

module.exports = {
  new(req, res, next){
    res.render("profiles/new", {locationId: req.params.locationId});
  },
  create(req, res, next){
     let newProfile= {
       username: req.body.username,
       avatar: req.body.avatar,
       aboutMe:req.body.aboutMe,
       link: req.body.link,
       pic1: req.body.pic1,
       pic2: req.body.pic2,
       pic3: req.body.pic3,
       pic4: req.body.pic4,
       locationId: req.params.locationId,
       userId: req.user.id
     };
     profileQueries.addProfile(newProfile, (err, profile) => {
       if(err){
         res.redirect(500, "/profiles/new");
       } else {
         res.redirect(303, `/locations/${newProfile.locationId}/profiles/${profile.id}`);
       }
     });
   },
   show(req, res, next){
    profileQueries.getProfile(req.params.id, (err, profile) => {
      if(err || profile == null){
        res.redirect(404, "/");
      } else {
        res.render("profiles/show", { profile, user: profile.User , location:profile.Location });
      }
    });
  },
  destroy(req, res, next){
     profileQueries.deleteProfile(req.params.id, (err, deletedRecordsCount) => {
       if(err){
         res.redirect(500, `/locations/${req.params.locationId}/profiles/${req.params.id}`)
       } else {
         res.redirect(303, `/locations/${req.params.locationId}`)
       }
     });
   },
   edit(req, res, next){
     profileQueries.getProfile(req.params.id, (err, profile) => {
       if(err || profile == null){
         res.redirect(404, "/");
       } else {
         res.render("profiles/edit", {profile});
       }
     });
   },
   update(req, res, next){
     profileQueries.updateProfile(req.params.id, req.body, (err, profile) => {
       if(err || profile == null){
         res.redirect(404, `/locations/${req.params.locationId}/profiles/${req.params.id}/edit`);
       } else {
         res.redirect(`/locations/${req.params.locationId}/profiles/${req.params.id}`);
       }
     });
   }
}
