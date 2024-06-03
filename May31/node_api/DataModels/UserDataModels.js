let mongooseObj = require('mongoose');
schemaObj = mongooseObj.Schema; //using the schema class from mongoose

//creates db with name mernstack18 or opens a connection if already present
mongooseObj.connect('mongodb://127.0.0.1/mernstack18');

let userSchema = new schemaObj({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  street: String,
  mobile: Number,
});

//user - collection name, pluralised by mongodb
let UserModel = mongooseObj.model('user', userSchema);
console.log(UserModel);
// this can be used in router/s to access the mongoose model methods like select, update queries
module.exports = UserModel;
