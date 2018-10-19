const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
  register(req, res, next){
    res.render("users/register");
  },
  signInForm(req, res, next){
     res.render("users/signin");
   },
   signIn(req, res, next){
     passport.authenticate("local")(req, res, function () {
       if(!req.user){
         req.flash("notice", "Sign in failed. Please try again.")
         res.redirect("/users/signin");
       } else {
         req.flash("notice", "You've successfully signed in!");
         res.redirect("/locations");
       }
     })
   },

   signOut(req, res, next){
     req.logout();
     req.flash("notice", "You've successfully signed out!");
     res.redirect("/");
   },
  create(req, res, next){
//#1
     let newUser = {
       email: req.body.email,
       password: req.body.password,
       passwordConfirmation: req.body.passwordConfirmation
     };
// #2
     userQueries.createUser(newUser, (err, user) => {
       if(err){
         req.flash("error", err);
         res.redirect("/users/register");
       } else {

// #3
         passport.authenticate("local")(req, res, () => {
           req.flash("notice", "You've successfully signed in!");
           res.redirect("/");
         })
       }
     });
   }
}
