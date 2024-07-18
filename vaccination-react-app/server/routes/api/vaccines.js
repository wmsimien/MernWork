const express = require("express");
const router = express.Router({});
const vaccinesController = require("../../controllers/vaccinesController");

const auth = require("../../middleware/auth");

router
  .route("/")
  .get(auth, vaccinesController.getAllVaccines)
  .post(auth, vaccinesController.createVaccine)
  .put(auth, vaccinesController.updateVaccine)
  .delete(vaccinesController.deleteVaccine);

router.route("/:id").get(auth, vaccinesController.getVaccine);
router
  .route("/:name/:type")
  .get(auth, vaccinesController.getVaccineByNameAndType);

module.exports = router;
