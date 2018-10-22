const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/locations';
const sequelize = require('../../src/db/models/index').sequelize;
const Location = require('../../src/db/models').Location;
const Profile = require('../../src/db/models').Profile;
const User = require("../../src/db/models").User;

describe("routes : profiles", () => {

  beforeEach((done) => {
    this.location;
    this.profile;
    this.user;
    sequelize.sync({force: true}).then((res) => {
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user;
        Location.create({
          username: "London, UK",

          profiles: [{
            username: "Batman",
            userId: this.user.id
          }]
        }, {
          include: {
            model: Profile,
            as: "profiles"
          }
        })
        .then((location) => {
          this.location = location;
          this.profile = location.profiles[0];
          done();
        })
      })
    });
  });

  // Context of Guest User
  describe("guest user performing CRUD actions for Profile", () => {

    beforeEach((done) => {
      request.get({
        url: "http://localhost:3000/auth/fake",
        form: {
          role: "guest",
          //userId: '8'
        }
      },
        (err, res, body) => {
          done();
        }
      );
    });

  describe("GET /locations/:locationId/profiles/new", () => {
    it("should not render a new profile form", (done) => {
      request.get(`${base}/${this.location.id}/profiles/new`, (err, res, body) => {
        expect(body).toContain("Error");
        done();
      });
    });
  });

  describe("POST /locations/:locationId/profiles/create", () => {
    it("should not create a new profile", (done) => {
      const options = {
        url: `${base}/${this.location.id}/profiles/create`,
        form: {
          username: "Superman",
        }
      };
      request.profile(options,
        (err, res, body) => {
          Profile.findOne({where: {username: "Batman"}})
          .then((profile) => {
            expect(profile).toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
  });

  describe("GET /locations/:locationId/profiles/:id", () => {
    it("should render a view with the selected profile", (done) => {
      request.get(`${base}/${this.location.id}/profiles/${this.profile.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Batman");
        done();
      });
    });
  });

  describe("POST /locations/:locationId/profiles/:id/destroy", () => {
    it("should not delete the profile with the associated ID", (done) => {
      Profile.all()
      .then((profiles) => {

        const profileCountBeforeDelete = profiles.length;

        expect(profileCountBeforeDelete).toBe(1);

        request.profile(`${base}${this.location.id}//profiles/${this.profile.id}/destroy`, (err, res, body) => {
          Profile.all()
          .then((profiles) => {
            expect(err).toBeNull();
            expect(profiles.length).toBe(profileCountBeforeDelete);
            done();
          })

        });
      });

    });

  });

  describe("GET /locations/:locationId/profiles/:id/edit", () => {
    it("should not render a view with an edit profile form", (done) => {
      //console.log('------- START');
      request.get(`${base}/${this.location.id}/profiles/${this.profile.id}/edit`, (err, res, body) => {
//console.log('------- IN IT');
        expect(err).toBeNull();
        expect(body).not.toContain("Edit Profile");
        //console.log('------- DONE');
        done();
      });
    });
  });

  describe("POST /locations/:locationId/profiles/:id/update", () => {
    it("should not return a status code 302", (done) => {
      request.profile({
        url: `${base}/${this.location.id}/profiles/${this.profile.id}/update`,
        form: {
          username: "Batman"
        }
      }, (err, res, body) => {
        expect(res.statusCode).not.toBe(302);
        done();
      });
    });
  });
  });//End Guest User Context

  // Context of Member User
  describe("admin user performing CRUD actions for Location", () => {

    beforeEach((done) => {
      User.create({
        email: "admin@example.com",
        password: "123456",
        role: "admin",
      })
      .then((user) => {
        request.get({         // mock authentication
          url: "http://localhost:3000/auth/fake",
          form: {
            role: user.role,     // mock authenticate as admin user
            userId: user.id,
            email: user.email
          }
        },
          (err, res, body) => {
            done();
          }
        );
      });
    });

  describe("GET /locations/:locationId/profiles/new", () => {
    it("should render a new profile form", (done) => {
      request.get(`${base}/${this.location.id}/profiles/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Profile");
        done();
      });
    });
  });

  describe("POST /locations/:locationId/profiles/create", () => {
    it("should create a new profile and redirect", (done) => {
      const options = {
        url: `${base}/${this.location.id}/profiles/create`,
        form: {
          username: "Batman"

        }
      };
      request.profile(options,
        (err, res, body) => {
          Profile.findOne({where: {username: "Batman"}})
          .then((profile) => {
            expect(profile).not.toBeNull();
            expect(profile.username).toBe("Watching snow melt");
            expect(profile.locationId).not.toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
    it("should not create a new profile that fails validations", (done) => {
      const options = {
        url: `${base}/${this.location.id}/profiles/create`,
        form: {
          username: "a"
        }
      };
      request.profile(options,
        (err, res, body) => {
          Profile.findOne({where: {username: "a"}})
          .then((profile) => {
            expect(profile).toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
  });

  describe("GET /locations/:locationId/profiles/:id", () => {
    it("should render a view with the selected profile", (done) => {
      request.get(`${base}/${this.location.id}/profiles/${this.profile.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Batman");
        done();
      });
    });
  });

  describe("POST /locations/:locationId/profiles/:id/destroy", () => {
    it("should delete the profile with the associated ID", (done) => {
      expect(this.profile.id).toBe(1);
        request.profile(`${base}/${this.location.id}/profiles/${this.profile.id}/destroy`, (err, res, body) => {
          Profile.findById(1)
          .then((profile) => {
            expect(err).toBeNull();
            expect(profile).toBeNull();
            done();
          })
       });
     });
   });

  describe("GET /locations/:locationId/profiles/:id/edit", () => {
    it("should render a view with an edit profile form", (done) => {
      request.get(`${base}/${this.location.id}/profiles/${this.profile.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Profile");
        expect(body).toContain("Batman");
        done();
      });
    });
  });

  describe("POST /locations/:locationId/profiles/:id/update", () => {
    it("should return a status code 302", (done) => {
      request.profile({
        url: `${base}/${this.location.id}/profiles/${this.profile.id}/update`,
        form: {
          username: "Superman"

        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(302);
        done();
      });
    });
  });
  }); //End Context of Membe
