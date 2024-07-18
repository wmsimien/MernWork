const mongoose = require('mongoose');
// mongoose auto increment plugin
//You must pass your DB connection instance for this plugin to work.
//This is needed in order to create a collection on your DB where to store increment references.
const AutoIncrement = require('mongoose-sequence')(mongoose);
// use schema class from mongoose
Schema = mongoose.Schema;

// create or open connection w/ db
mongoose.connect('mongodb://127.0.0.1/mernstack18');

const clientSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    conceptName: {
      type: String,
      default: 'years', // months, years
      required: true,
    },
    profession: {
      type: String,
    },
    contactName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    disease: [
      {
        type: String,
      },
    ],
    email: {
      type: String,
    },
    roles: {
      type: String,
      default: 'user', //admin
    },
    refreshToken: {
      type: String,
    },
    medicalCertificate: {
      // A medical certificate or doctor's certificate is a written statement from a
      //physician or another medically qualified health care provider which attests to
      //the result of a medical examination of a patient.
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    //add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

clientSchema.plugin(AutoIncrement, {
  inc_field: 'clientId',
  id: 'clientNums',
  start_seq: 100,
});

module.exports = mongoose.model('Client', clientSchema);
