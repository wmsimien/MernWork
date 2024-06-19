let mongooseObj = require('mongoose');
schemaObj = mongooseObj.Schema;

mongooseObj.connect('mongodb://127.0.0.1/mernstack18');

let hobbySchema = new schemaObj({
  hobbyName: { type: String, required: true },
});

let HobbyModel = mongooseObj.model('hobby', hobbySchema);
console.log(HobbyModel);

module.exports = HobbyModel;
