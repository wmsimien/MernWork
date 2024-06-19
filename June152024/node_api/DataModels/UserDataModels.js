/*
let initialState = {
  user: {
    userName: 'Donald',
    password: 'test123',
    street: 'Somewhere over the rainbow',
    mobile: 5551212,
  },
};

*/
/**
 * first import mongoose, use the mongoose to create db if not there a connection
 * a schema to demonstrate the data key value pairs + validtions
 * using schea to  create a datamodel to provide mongoose methods to access, modify data
 * and to create the collection
 * 
This data model will allow us to do mapping with mongodb using mongoose
MongoDB - non-relational, document oriented DB, non-schema
create a connection using mongodb client, 
use mongoose to make connection to mongodb
get schema object created and also develop data model to be used in api
set validations and data types in schema
although mongodb is schema less but with mongoose we can create schema to start with

wandaavery

sBthwCW5vopI38CW


mongodb+srv://wandaavery:sBthwCW5vopI38CW@cluster0.svcl5bz.mongodb.net/


mongodb+srv://wandaavery:<password>@cluster0.svcl5bz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
 */
// const dotenv = require('dotenv');
// dotenv.config({ path: './config.env' });
let mongooseObj = require('mongoose');
schemaObj = mongooseObj.Schema; //using the schema class from mongoose

//creates db with name mernstack18 or opens a connection if already present
mongooseObj.connect('mongodb://127.0.0.1/mernstack18');
// mongooseObj.connect('mongodb://localhost/mernstack18');

let userSchema = new schemaObj(
  {
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    street: String,
    mobile: Number,
  }
  //   {
  //     versionKey: false, //false - set to false then it wont create in mongodb
  //   }
);

//user - collection name, pluralised by mongodb
let UserModel = mongooseObj.model('user', userSchema);
console.log(UserModel);
// this can be used in router/s to access the mongoose model methods like select, update queries
module.exports = UserModel;
