const mongoose = require('mongoose');
// use schema class from mongoose
Schema = mongoose.Schema;
// mongoose auto increment plugin
//You must pass your DB connection instance for this plugin to work.
//This is needed in order to create a collection on your DB where to store increment references.
const AutoIncrement = require('mongoose-sequence')(mongoose);

// create or open connection w/ db
mongoose.connect('mongodb://127.0.0.1/mernstack18');

const appointmentSchema = new Schema(
  {
    client: {},
    appointmentDate: {
      type: Date,
      default: new Date(),
    },
    appointmentTime: {
      type: String,
    },
    healthFacility: {},
    vaccine: {},
    payment: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      default: 'scheduled', // cancelled
    },
  },
  {
    //add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

appointmentSchema.plugin(AutoIncrement, {
  inc_field: 'apptId',
  id: 'apptNums',
  start_seq: 3000,
});

module.exports = mongoose.model('Appointment', appointmentSchema);
