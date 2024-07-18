const mongoose = require('mongoose');
// use schema class from mongoose
Schema = mongoose.Schema;
// mongoose auto increment plugin
//You must pass your DB connection instance for this plugin to work.
//This is needed in order to create a collection on your DB where to store increment references.
const AutoIncrement = require('mongoose-sequence')(mongoose);
// create or open connection w/ db
mongoose.connect('mongodb://127.0.0.1/mernstack18');

const vaccineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    price: { type: Number },
    sideEffect: {
      type: String,
    },
    origin: {
      type: String,
    },
    doseRequired: {
      type: Number,
    },
    otherInfo: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
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

vaccineSchema.plugin(AutoIncrement, {
  inc_field: 'vaccineId',
  id: 'vaccineNums',
  start_seq: 4000,
});

module.exports = mongoose.model('Vaccine', vaccineSchema);
