//Q2. As javascript is not a type safe and has auto cast feature - try showing below values from the same variable
// and its type as well :values are - "Robert ", .0266, false, {myname : "Test Me"}, 25166665, undefined, true, "Robert Jr.", null, {}, -32767

var value = "Robert ";
console.log(value);
console.log(typeof value);

value = .266;
console.log(value);
console.log(typeof value);

value = false;
console.log(value);
console.log(typeof value);

value = {myname : "Test Me"};
console.log(value);
console.log(typeof value);

value = 25166665;
console.log(value);
console.log(typeof value);

value = undefined;
console.log(value);
console.log(typeof value);

value = true;
console.log(value);
console.log(typeof value);

value = "Robert Jr.";
console.log(value);
console.log(typeof value);

value = null;
console.log(value);
console.log(typeof value);

value = {};
console.log(value);
console.log(typeof value);

value = -32767;
console.log(value);
console.log(typeof value);

//Q3. Create a function with name show user info, this function expects three params, firstname, lastname and age
//  print all the details in the given function

function showUserInfo(firstName, lastName, age) {
    console.log(`My name is ${firstName} ${lastName} and my age is ${age}`);
}
showUserInfo("Mary", "Small", 24);

//Q4. Create a function with name doaddition, pass three parameters and return the sum of all the three numbers
// below output needs to be monitored - add(2,3,4), add(2), add(2.3,3), add("first", 2, "three")
// analyse the outputs we got and try explaining the reasons behind

function doaddition(num1, num2, num3) {
    
    return num1 + num2 + num3;
}
console.log(doaddition(2,3,4)); // returns the sum of the numbers provided which is 9

console.log(doaddition(2));  // returns NaN since two of the parameters are not provided and are null; thus, the answer is 'not a number'

console.log(doaddition(2.3,3)); // returns NaN since not all three of the parameters are provided and null is the value

console.log(doaddition("first", 2, "three")); // performs string concatentation since string value(s) are provided.

//Q5. Give me an example of your choice on closure, hoisting, constructor function, each.
function whatDay() {
    // closure
    var day = function () {
        console.log(`Today is ${today}`);
    }
    var today = "Good Friday!"; // hoisting example
    return day;
}

var said = whatDay();
said();

// constructor function
function Person() {
    this.name;
    this.age;
}

var p1 = new Person();
p1.name = "Tom";
p1.age = 25;
console.log(p1);

//Q8. what will the following code output? why?

// var arr = [10, 12, 15, 21];
// for (var i = 0; i < arr.length; i++) {
//   setTimeout(function() {
//     console.log('Index: ' + i + ', element: ' + arr[i]);
//   }, 3000);
// }

// answer:  Every three seconds the array arr elements will be console logged  or printed to the console
// as denoted in the console log statement.