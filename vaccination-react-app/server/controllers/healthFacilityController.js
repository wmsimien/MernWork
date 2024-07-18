const HealthFacilities = require("../models/HealthFacility");

// get all health facilities by zip code
const getFacilityById = async (req, res) => {
  console.log("getFacilityByHealthFacId: ", req.params.id);
  if (!req?.params?.id)
    return res
      .status(400)
      .json({ message: "An invalid healthFac Id provided." });

  const healthFacility = await HealthFacilities.findOne({
    _id: req.params.id,
    active: true,
  }).exec();

  console.log("healthFacility found: ", healthFacility);
  if (!healthFacility) {
    return res.status(204).json({
      message: `No Health Facility found with Id ${req.params.id}.`,
    });
  }
  res.json(healthFacility);
};

module.exports = {
  getFacilityById,
};
