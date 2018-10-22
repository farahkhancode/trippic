const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/locations/";
const sequelize = require("../../src/db/models/index").sequelize;
const Location = require("../../src/db/models").Location;
const User = require("../../src/db/models").User;


describe("routes : locations", () => {

   beforeEach((done) => {
     this.location;
     sequelize.sync({force: true}).then(() => {

      Location.create({
        name: "Paris, France"

      })
       .then((res) => {
         this.location = res;
         done();
       })
       .catch((err) => {
         console.log(err);
         done();
       });

     });

   });

   describe("admin user performing CRUD actions for location", () => {

// #2: // before each test in admin user context, send an authentication request
       // to a route we will create to mock an authentication request
     beforeEach((done) => {
       User.create({
         email: "admin@example.com",
         password: "123456",
         role: "admin"
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

  describe("GET /locations", () => {

    it("should return all locations", (done) => {
      request.get(base, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("locations");

        done();
      });
    });
  });

  describe("GET /locations/new", () => {

    it("should render a view with a new location form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New location");
        done();
      });
    });

  });

  describe("POST /locations/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        name: "London, UK"
      }
    };

    it("should create a new location and redirect", (done) => {

      request.post(options,

        (err, res, body) => {
          location.findOne({where: {name: "London, UK"}})
          .then((location) => {
            expect(location.name).toBe("London, UK");

            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        });
      });

    });


  describe("GET /locations/:id", () => {

    it("should render a view with the selected location", (done) => {
      request.get(`${base}${this.location.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Paris, France");
        done();
      });
    });

  });

  describe("POST /locations/:id/destroy", () => {

    it("should delete the location with the associated ID", (done) => {
      location.all()
      .then((locations) => {
        const locationCountBeforeDelete = locations.length;

        expect(locationCountBeforeDelete).toBe(1);

        request.post(`${base}${this.location.id}/destroy`, (err, res, body) => {
          location.all()
          .then((locations) => {
            expect(err).toBeNull();
            expect(locations.length).toBe(locationCountBeforeDelete - 1);
            done();
          })

        });
      });

    });

  });


// #3: define the member user context
   describe("member user performing CRUD actions for location", () => {

 // #4: Send mock request and authenticate as a member user
     beforeEach((done) => {
       request.get({
         url: "http://localhost:3000/auth/fake",
         form: {
           role: "member"
         }
       }),
           done();

     });



describe("GET /locations", () => {

  it("should return a status code 200 and all locations", (done) => {
    request.get(base, (err, res, body) => {
      expect(err).toBeNull();
      expect(body).toContain("locations");
      done();
    });
  });
});

describe("POST /locations/create", () => {
  const options = {
    url: `${base}create`,
    form: {
      name: "London, UK"
    }
  };



  it("should not create a new location", (done) => {
    request.post(options, (err, res, body) => {
                     location.findOne({where: {name: "London, UK"}})
                     .then((location) => {
                         expect(location).toBeNull();
                         done();
                     })
                     .catch((err) => {
                         console.log(err);
                         done();
                     });
                 });
             });
         });

describe("GET /locations/:id", () => {

  it("should render a view with the selected location", (done) => {
    request.get(`${base}${this.location.id}`, (err, res, body) => {
      expect(err).toBeNull();
      expect(body).toContain("Paris, France");
      done();
    });
  });

});

describe("POST /locations/:id/destroy", () => {

  it("should not delete the location with the associated ID", (done) => {

    location.all()
    .then((locations) => {

      const locationCountBeforeDelete = locations.length;

      expect(locationCountBeforeDelete).toBe(1);

      request.post(`${base}${this.location.id}/destroy`, (err, res, body) => {
        location.all()
        .then((locations) => {
          expect(err).toBeNull();
          expect(locations.length).toBe(locationCountBeforeDelete);
          done();
        })

      });
    });

  });

});


});
