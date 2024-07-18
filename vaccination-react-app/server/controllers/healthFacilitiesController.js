const HealthFacilities = require('../models/HealthFacility');

// get all health facilities
const getAllHealthFacilities = async (req, res) => {
  const healthFacilities = await HealthFacilities.find();
  if (!healthFacilities) {
    return res.status(204).json({ message: 'No health facilities found.' });
  }
  res.json(healthFacilities);
};

// get all health facilities by zip code
const getHealthFacilitiesByZipCode = async (req, res) => {
  if (!req?.params?.zipCode)
    return res
      .status(400)
      .json({ message: 'Zip code is required for search.' });

  const healthFacilities = await HealthFacilities.find({
    zipCode: req.params.zipCode,
    active: true,
  }).exec();

  if (!healthFacilities) {
    return res.status(204).json({
      message: `No Health Facilities found in this zip code ${req.params.zipCode}.`,
    });
  }
  res.json(healthFacilities);
};

// create new health facility
const createHealthFacilities = async (req, res) => {
  const { name, type, address, charges, zipCode } = req.body;

  // validate data
  if (!name || !type) {
    return res
      .status(400)
      .json({ message: "The heath facility's name and type are required." });
  }

  // check if duplicate heath facility
  const duplicate = await HealthFacilities.findOne({ name, type })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: 'Duplicate heatlth facility.' });
  }

  // create new health facility
  const healthFacility = await HealthFacilities.create({
    name,
    type,
    address,
    charges,
    zipCode,
  });

  if (healthFacility) {
    res.status(201).json({
      message: `New health facility ${healthFacility} created successfully.`,
    });
  } else {
    res.status(400).json({ message: 'Invalid health facility data received.' });
  }
};

// update health facility information (address, charges, active)
const updateHealthFacility = async (req, res) => {
  const { id, name, address, charges, zipCode, active } =
    req.body.healthFacility;

  // validate data
  if (!id) {
    return res
      .status(400)
      .json({ message: "A Health Facility's ID must be provided." });
  }

  // find and update health facility
  const updatedHealthFacility = await HealthFacilities.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name,
        address,
        charges,
        active,
        zipCode,
      },
    }
  ).lean();

  res.json({ message: `Updated health facility: ${updatedHealthFacility}` });
};

// delete/inactivate health facility
const deleteHealthFacility = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'Health Facility ID required' });

  const healthFacilities = await HealthFacilities.findOne({
    _id: req.params.id,
  }).exec();

  if (!healthFacilities) {
    return res
      .status(204)
      .json({ message: `Health Facility ID ${req.params.id} not found` });
  }
  const deletedHealthFacility = await HealthFacilities.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { active: false } }
  );
  res.json(deletedHealthFacility);
};

// get health facility by name and type
const getHealthFacilityByNameAndType = async (req, res) => {
  console.log('req.params: ', req.params);

  const { name, type } = req.params;

  if (!name || !type)
    return res
      .status(400)
      .json({ message: 'Health facility name and type required' });
  const healthFacility = await HealthFacilities.findOne({ name, type }).exec();

  if (!healthFacility) {
    return res
      .status(204)
      .json({ message: `Health facility ${name} and type ${type} not found` });
  }

  res.json(healthFacility);
};

// get all health facilities by zip code
const getFacilityById = async (req, res) => {
  console.log('getFacilityByHealthFacId: ', req.params.id);
  if (!req?.params?.id)
    return res
      .status(400)
      .json({ message: 'An invalid healthFac Id provided.' });

  const healthFacility = await HealthFacilities.findOne({
    _id: req.params.id,
    active: true,
  }).exec();

  console.log('healthFacility found: ', healthFacility);
  if (!healthFacility) {
    return res.status(204).json({
      message: `No Health Facility found with Id ${req.params.id}.`,
    });
  }
  res.json(healthFacility);
};

module.exports = {
  getAllHealthFacilities,
  createHealthFacilities,
  updateHealthFacility,
  deleteHealthFacility,
  getHealthFacilityByNameAndType,
  getHealthFacilitiesByZipCode,
  getFacilityById,
};
