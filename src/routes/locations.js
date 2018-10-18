const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController")

router.get("/locations", locationController.index);
router.get("/locations/new", locationController.new);
router.post("/locations/create", locationController.create);
router.get("/locations/:id", locationController.show);
router.post("/locations/:id/destroy", locationController.destroy);

module.exports = router;
