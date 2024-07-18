const Vaccine = require('../models/Vaccine');
const ObjectId = require('mongodb').ObjectId;

// get all vaccines
const getAllVaccines = async (req, res) => {
  const vaccines = await Vaccine.find();
  if (!vaccines) {
    return res.status(204).json({ message: 'No vaccines found.' });
  }
  res.json(vaccines);
};

// create new vaccine
const createVaccine = async (req, res) => {
  console.log('createVaccine: ', req.body);
  const {
    name,
    type,
    price,
    sideEffect,
    origin,
    doseRequired,
    otherInfo,
    active,
    startDate,
    endDate,
  } = req.body;

  if (!name || !type) {
    return res.status(400).json({
      message: 'The name, type of vaccine is required.',
    });
  }

  // check for duplicate vaccines (name and type)
  const duplicate = await Vaccine.findOne({ name, type }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: 'Duplicate vaccine name and type.' });
  }

  const vaccine = await Vaccine.create({
    name,
    type,
    price,
    sideEffect,
    origin,
    doseRequired,
    otherInfo,
    active,
    startDate,
    endDate,
  });
  console.log('created vaccine: ', vaccine);
  if (vaccine) {
    res
      .status(201)
      .json({ message: `New vaccine ${vaccine} created successfully.` });
  } else {
    res.status(400).json({ message: 'Invalid vaccine data received.' });
  }
};

// update vaccine
const updateVaccine = async (req, res) => {
  console.log('update vaccine: ', req.body);
  const {
    id,
    name,
    type,
    price,
    sideEffect,
    origin,
    doseRequired,
    otherInfo,
    startDate,
    endDate,
    active,
  } = req.body.vaccine;

  // check data
  if (!name) {
    return res.status(400).json({
      message: `Vaccine with vaccine Id ${id} and name ${name} not found.`,
    });
  }

  // find vaccine and update
  const updatedVaccine = await Vaccine.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name,
        type,
        price,
        sideEffect,
        origin,
        doseRequired,
        otherInfo,
        startDate,
        endDate,
        active,
      },
    }
  ).lean();

  res.json({ message: `Updated vaccine information: ${updatedVaccine}` });
};

// get vaccine by name and type
const getVaccineByNameAndType = async (req, res) => {
  console.log('req.params: ', req.params);

  const { name, type } = req.params;

  if (!name || !type)
    return res.status(400).json({ message: 'Vaccine name and type required' });
  const vaccine = await Vaccine.findOne({ name, type }).exec();

  if (!vaccine) {
    return res
      .status(204)
      .json({ message: `Vaccine ${name} and type ${type} not found` });
  }

  res.json(vaccine);
};

// get vaccine by ID
const getVaccine = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'Vaccine ID required' });

  const id = new ObjectId(req.params.id);

  const vaccine = await Vaccine.findOne({ _id: id }).exec();
  console.log('getVaccine based on id: ', vaccine);
  if (!vaccine) {
    return res
      .status(204)
      .json({ message: `Vaccine ID ${req.params.id} not found` });
  }

  res.json(vaccine);
};

// delete/inactivate vaccine
const deleteVaccine = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'Vaccine ID required' });
  const vaccine = await Vaccine.findOne({ _id: req.params.id }).exec();

  if (!vaccine) {
    return res
      .status(204)
      .json({ message: `Vaccine ID ${req.params.id} not found` });
  }
  const deleteVaccine = await Vaccine.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { active: false } }
  );
  res.json(deleteVaccine);
};

module.exports = {
  getAllVaccines,
  createVaccine,
  updateVaccine,
  deleteVaccine,
  getVaccineByNameAndType,
  getVaccine,
};
