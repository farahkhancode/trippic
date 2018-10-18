const Profile = require("./models").Profile;
const Location = require("./models").Location;

module.exports = {
  addProfile(newProfile, callback){
        return Profile.create(newProfile)
        .then((profile) => {
          callback(null, profile);
        })
        .catch((err) => {
          callback(err);
        })
      },
  getProfile(id, callback){
     return Profile.findById(id)
     .then((profile) => {
       callback(null, profile);
     })
     .catch((err) => {
       callback(err);
     })
   },
   deleteProfile(id, callback){
     return Profile.destroy({
       where: { id }
     })
     .then((deletedRecordsCount) => {
       callback(null, deletedRecordsCount);
     })
     .catch((err) => {
       callback(err);
     })
   },
   updateProfile(id, updatedProfile, callback){
     return Profile.findById(id)
     .then((profile) => {
       if(!profile){
         return callback("Profile not found");
       }

       profile.update(updatedProfile, {
         fields: Object.keys(updatedProfile)
       })
       .then(() => {
         callback(null, profile);
       })
       .catch((err) => {
         callback(err);
       });
     });
   }

}
