const express = require("express");
const router = express.Router();
 const validation = require("./validation");

const profileController = require("../controllers/profileController")

router.get("/locations/:locationId/profiles/new", profileController.new);
router.post("/locations/:locationId/profiles/create", validation.validateProfiles, profileController.create);
router.get("/locations/:locationId/profiles/:id", profileController.show);
router.post("/locations/:locationId/profiles/:id/destroy", profileController.destroy);
router.get("/locations/:locationId/profiles/:id/edit", profileController.edit);
router.post("/locations/:locationId/profiles/:id/update", validation.validateProfiles, profileController.update);
module.exports = router;
