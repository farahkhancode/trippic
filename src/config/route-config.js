module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const locationRoutes = require("../routes/locations");
    const profileRoutes = require("../routes/profiles");


    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(locationRoutes);
    app.use(profileRoutes);

  }
}
