module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const userRoutes = require("../routes/users");
    const locationRoutes = require("../routes/locations");
    const profileRoutes = require("../routes/profiles");

    if(process.env.NODE_ENV === "test") {
        const mockAuth = require("../../spec/support/mock-auth.js");
        mockAuth.fakeIt(app);
      }

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(locationRoutes);
    app.use(profileRoutes);

  }
}
