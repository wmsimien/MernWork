const express = require("express");
const router = express.Router({});
const healthFacilitiesController = require("../../controllers/healthFacilitiesController");

const auth = require("../../middleware/auth");

router
  .route("/:zipCode")
  .get(auth, healthFacilitiesController.getHealthFacilitiesByZipCode);

router
  .route("/")
  .get(auth, healthFacilitiesController.getAllHealthFacilities)
  .post(auth, healthFacilitiesController.createHealthFacilities)
  .put(auth, healthFacilitiesController.updateHealthFacility)
  .delete(auth, healthFacilitiesController.deleteHealthFacility);

router
  .route("/:name/:type")
  .get(healthFacilitiesController.getHealthFacilityByNameAndType);

router
  .route("/healthFacility/:id")
  .get(auth, healthFacilitiesController.getFacilityById);

module.exports = router;
