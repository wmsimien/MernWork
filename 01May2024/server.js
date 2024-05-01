/*
//Assessment NodeAPI and ES6 - 01-May-2024

//1. Create a setup for Express Web Server
//2. Configure a route name - Student
//3. Create a express app and configure in server.js to delegate routes with - "Student"
//4. Create API's in default setup - getStudentDetails - Pass Student info like - Name, Age, Address, Session as query string
//5. Save this information received in #4  to a file named studentIfo using fs module async way

//6. Give me an example of map and set collection each with at least four properties implemented - like get, set, clear, etc
//7. Create a promise object that get resloved after two seconds and rejected after three. Also it returns five ES6 features on resolved

//8. Use the spread and rest operator to create a function which can multiple numbers from 1...n (n is the number of choice)
//9. Use the question #7 to build promises using async and await - with multithread
//10. Create an example of generator function of your choice
*/
// require packages and files
const express = require("express");
const fs = require("fs");

const studentRoute = require("./routes/studentRoutes");

// define variables
const port = 3000;

// get instances of express
const app = express();
const studentApp = express(); 

// root
app.get("/", (req, res) => {
   res.send(`<h2>It's Assessment Day!!</h2>`);
});

//6. Give me an example of map and set collection each with at least four properties implemented - like get, set, clear, etc
const daysMap = new Map();
daysMap.set("01", "Sunday");
daysMap.set("02", "Monday");
daysMap.set("03", "Tuesday");
daysMap.set("04", "Wednesday");
daysMap.set("05", "Thursday");
daysMap.set("06", "Friday");
daysMap.set("04", "Saturday");

console.log(daysMap.entries());
console.log(daysMap.get("05"));
daysMap.clear();
console.log(daysMap.entries());
daysMap.set("HappyDays", "Friday");
console.log(daysMap);

const tripSet = new Set();
tripSet.add("Chicago");
tripSet.add("Washington DC");
tripSet.add("Alaska");
tripSet.add("Chicago");

console.log(tripSet);
tripSet.forEach(p => console.log(p));
tripSet.clear();
console.log(tripSet);


//7. Create a promise object that get resloved after two seconds and rejected after three. Also it returns five ES6 features on resolved
const myPromise = new Promise((resolve, reject) => {

    // setTimeout(() => {
    //     resolve ("I will successfully cook today");           
    // }, 2000);

    setTimeout(() => {
        reject ("I failed to cook today.");         
    }, 3000);

});

// console.log(myPromise);
myPromise.then((resolve, reject) => {
    console.log(JSON.stringify(resolve));
    // console.log(JSON.stringify(reject));
}).catch((error) => {console.error(error)});

//8. Use the spread and rest operator to create a function which can multiple numbers from 1...n (n is the number of choice)
const multiNums = (...digits) => {
    let res = 0;
    res = digits.reduce((acc, digit) => acc * digit, 1);
    return res;
}
console.log(multiNums(...[5, 7]));
console.log(multiNums(...[2, 4, 6]));
console.log(multiNums(...[5]));

//9. Use the question #7 to build promises using async and await - with multithread
async function willCook() {
    try {
        await myPromise; 
    } catch(err) {
        console.error(`An error has occurred: ${err}`);
    }
}
willCook();

//10. Create an example of generator function of your choice
// will generate an id
function* generateId() {  
    let id = 1;

    while(true) {
        yield id;
        id++;
    }
}
const generatorObject = generateId();  // returns a generator object
console.log(generatorObject.next());  // call next get returned value
console.log(generatorObject.next());
console.log(generatorObject.next());

// endpoint will generate an id too
app.get("/genId", (req, res) => {
    res.json(generatorObject.next());
});

app.use("/student", studentApp);
studentApp.use(express.urlencoded({extended: true}));
studentApp.use(studentRoute);

// listen for start of application/server
app.listen(port, () => {
    console.log(`Server running on port: ${port}.`);
});