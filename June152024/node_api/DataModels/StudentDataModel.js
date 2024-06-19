/**
 * let initialState = {
  student: {
    studentName: 'Student One',
    level: 'Beginner',
    email: 'student1@hotmail.com',
  },
};

 */
let mongooseObj = require('mongoose');
schemaObj = mongooseObj.Schema;

// mongooseObj.connect('mongodb://localhost:27017/mernstack18');
mongooseObj.connect('mongodb://127.0.0.1/mernstack18');

let studentSchema = new schemaObj({
  studentName: { type: String, required: true },
  level: { type: String, required: true },
  email: { type: String, required: true },
  hobby: [String],
});

let StudentModel = mongooseObj.model('student', studentSchema);
console.log(StudentModel);

module.exports = StudentModel;
