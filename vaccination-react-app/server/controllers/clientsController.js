const Client = require('../models/Client');
const bcrypt = require('bcrypt');
const ObjectId = require('mongodb').ObjectId;

// get all clients
const getAllClients = async (req, res) => {
  // don't return passwords
  const clients = await Client.find().select('-password').lean();

  console.log('all clients: ');

  const maleCnt = await Client.find({ gender: 'Male' }).count();
  const femaleCnt = await Client.find({ gender: 'Female' }).count();

  console.log('nums of male and female: ', maleCnt, femaleCnt);
  if (!clients) {
    return res.status(204).json({ message: 'No clients found.' });
  }
  res.json([
    { gender: 'Male', value: maleCnt },
    { gender: 'Female', value: femaleCnt },
  ]);
  // res.json(clients);
};

// create client
const createClient = async (req, res) => {
  console.log('createClient: ', req.body);
  const {
    firstName,
    lastName,
    username,
    password,
    age,
    conceptName,
    profession,
    contactName,
    contactNumber,
    address,
    gender,
    disease,
    roles,
    medicalCertificate,
    email,
    active,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !username ||
    !password ||
    !age ||
    !conceptName ||
    !contactName ||
    !contactNumber ||
    !address
  ) {
    return res.status(400).json({
      message:
        'The following information is required: First and Last names, Username, Password, Age, Concept name, Contact name and number, and Address.',
    });
  }

  // check for duplicate client
  const duplicate = await Client.findOne({
    firstName,
    lastName,
    username,
  }).exec();

  if (duplicate) return res.sendStatus(409);

  // create new client
  try {
    // encrypt password
    const hashedPwd = await bcrypt.hash(password, 10);

    // create and store password
    const newClient = await Client.create({
      firstName,
      lastName,
      username,
      password: hashedPwd,
      age,
      conceptName,
      profession,
      contactName,
      contactNumber,
      address,
      gender,
      disease,
      roles,
      medicalCertificate,
      email,
    });
    console.log('newClient: ', newClient);

    res
      .status(201)
      .json({ success: `New client ${newClient} has been created.` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get client by category;  .select('-password')
const getByCategory = async (req, res) => {
  if (!req?.params?.category)
    return res.status(400).json({ message: 'Category required' });

  let results = {};
  const category = req.params.category;
  switch (category) {
    case 'age':
      results = await Client.aggregate([{ $sort: { age: -1, _id: 1 } }]).exec();

      break;

    default:
      results = await Client.find().select('-password').exec();

      break;
  }

  if (!results) {
    return res
      .status(204)
      .json({ message: `No clients found for category ${category}` });
  }

  res.json(results);
};

// update client
const updateClient = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'Client ID required' });

  console.log('req.body: ', req.body);

  const client = await Client.findOne({ _id: req.params.id })
    .select('-password')
    .exec();

  console.log('found client for update: ', client);

  if (!client) {
    return res
      .status(204)
      .json({ message: `Client by username ${req.params.username} not found` });
  }

  const {
    firstName,
    lastName,
    username,
    password,
    age,
    gender,
    conceptName,
    profession,
    contactName,
    contactNumber,
    address,
    disease,
    medicalCertificate,
    email,
    active,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !username ||
    !password ||
    !age ||
    !conceptName ||
    !contactName ||
    !contactNumber ||
    !address
  ) {
    return res.status(400).json({
      message:
        'The following information is required: First and Last names, Username, Password, Age, Concept name, Contact name and number, and Address.',
    });
  }

  // hash password
  const hashedPwd = await bcrypt.hash(password, 10);

  const savedClient = await Client.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        firstName,
        lastName,
        username,
        password: hashedPwd,
        age,
        gender,
        conceptName,
        profession,
        contactName,
        contactNumber,
        address,
        disease,
        medicalCertificate,
        email,
      },
    }
  );

  res.json(savedClient);
};

const getClientById = async (req, res) => {
  console.log('getclientbyId: ', req.params);
  if (!req?.params?.id)
    return res.status(400).json({ message: 'Client ID required' });

  const id = new ObjectId(req.params.id);
  const client = await Client.findOne({ _id: id }).select('-password').exec();
  console.log('found client for update: ', client);
  if (!client) {
    return res
      .status(204)
      .json({ message: `Client by username ${req.params.username} not found` });
  }
  res.json(client);
};

// delete client by setting active to false
const deleteClient = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: 'Client ID required' });
  const client = await Client.findOne({ _id: req.params.id }).exec();

  if (!client) {
    return res
      .status(204)
      .json({ message: `Client ID ${req.params.id} not found` });
  }
  const deleteClient = await Client.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { active: false } }
  );
  res.json(deleteClient);
};

module.exports = {
  getAllClients,
  createClient,
  getByCategory,
  updateClient,
  getClientById,
  deleteClient,
};
