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

describe("POST /locations/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          name: "Paris, France"
        }
      };

      it("should create a new topic and redirect", (done) => {

//#1
        request.post(options,

//#2
          (err, res, body) => {
            Location.findOne({where: {name: "Paris, France"}})
            .then((location) => {
              expect(res.statusCode).toBe(303);
              expect(topic.title).toBe("Paris, France");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          });
      });
    });


  });
});
