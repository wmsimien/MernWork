const mongoose = require('mongoose');
// use schema class from mongoose
Schema = mongoose.Schema;
// mongoose auto increment plugin
//You must pass your DB connection instance for this plugin to work.
//This is needed in order to create a collection on your DB where to store increment references.
const AutoIncrement = require('mongoose-sequence')(mongoose);
// create or open connection w/ db
mongoose.connect('mongodb://127.0.0.1/mernstack18');

const healthFacilitiesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    charges: {
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

healthFacilitiesSchema.plugin(AutoIncrement, {
  inc_field: 'healthFacId',
  id: 'healthFacNums',
  start_seq: 1000,
});

module.exports = mongoose.model('HealthFacilities', healthFacilitiesSchema);
