'use strict';
// 1. How to preserve the immutability on my heroes list? Solve below problems using the same
// a. Get heroes who are not evils
// b. Print Unique family names
// c. Print Hero Names from given objects, and append sir in each of them before printing
// d. Do we have any hero in Marvel Family who is not evil


const heroes = [
  { name: 'Wolverine',      family: 'Marvel',    isEvil: false },
  { name: 'Deadpool',       family: 'Marvel',    isEvil: false },
  { name: 'Magneto',        family: 'Marvel',    isEvil: true  },
  { name: 'Charles Xavier', family: 'Marvel',    isEvil: false },
  { name: 'Batman',         family: 'DC Comics', isEvil: false },
  { name: 'Harley Quinn',   family: 'DC Comics', isEvil: true  },
  { name: 'Legolas',        family: 'Tolkien',   isEvil: false },
  { name: 'Gandalf',        family: 'Tolkien',   isEvil: false },
  { name: 'Saruman',        family: 'Tolkien',   isEvil: true  }
];
// 1. : The best way to call functions which will not mutate your away.
// 1a.
const notEvil = heroes.filter((e) => e.isEvil == false);
console.log(notEvil);

// 1b.
const uniqueFamilyNames = heroes.reduce((acc, fam) => {
    acc[fam.family] = acc[fam.family] ? acc[fam.family] + 1 : 1;

    return acc;
}, {});
console.log(uniqueFamilyNames);

// 1c.
const heroNameSir = heroes.map((hero) => `Sir ${hero.name}`);
console.log(heroNameSir);

// 1d.
const marvelFamNotEvil = heroes.some((e) => e.family == 'Marvel' && e.isEvil == false);
console.log(marvelFamNotEvil);

//2. Use the spread and rest operator to create a function which can multiple numbers from 1...n (n is the number of choice)
//   also need to print students of the session using same example
const multipleNums = (...numbers) => {
    let ans = 0;
    ans = numbers.reduce((acc, num) => acc * num, 1);

   return ans;
}
console.log(multipleNums(...[5, 6, 7]));

//3. Print the last name through destructuring and add a contact number:9119119110 as well
const person = {
    userDetails :{
        first: "FirstName",
        last: "LastName"
    }
};

const {...details} = person.userDetails;
details.contactNumber = 9119119110;
console.log(details.last);
console.log(details);

//4. Give me an example of const data manipulation
const sessionCohort = {
    name: "Daryl Lynn",
    stack: "MERN",
    batch: "Mach212024"
}
console.log(sessionCohort);
sessionCohort.stack = "MEAD";
console.log(sessionCohort);

//5. What is the difference between for-of and for-in show with examples
// Example 1
const largeDogBreeds = ["Bernese Mountain Dog", "Great Dane", "Newfoundland dog","St. Bernard", "Dobermann"];
// based on property name/item
for (let dog of largeDogBreeds) {
    console.log(dog);
}
// for in usage based on index
for (let dog in largeDogBreeds) {
    console.log(`Breed ${dog}: ` + largeDogBreeds[dog]);
}
// Example 2
const numbers = [1,2,3,4,5];
for (let n of numbers) {
    console.log(n);
}
for (let n in numbers) {
    console.log(`${n}: ${numbers[n]}`);
}

//6. Give me an example of bind and write its usage, comparison with arrow function
// bind will return a function to call later; arrow functions don't have their own
// specific 'this' keyword and will look to the closer parent object
const sessionUser = {
    fname: "Daryl Lynn",
    stack: "MERN",
    batch: "Mach212024",
    display: function() {
        console.log(this);
        console.log(`My name is ${this.fname} and I'm ejoying ${this.stack} sessions.`);
    },
    whoAmI : () => {
        console.log(this);
        console.log(`My name is ${this.fname}.`);
    }
}
const sessionUser2 = {
    fname: "Tory Miller",
}
console.log(sessionUser.display());
console.log(sessionUser.display.bind(sessionUser2)());

const session2 = sessionUser.whoAmI.bind(sessionUser2.fname);
console.log(session2());

//7. Create an example showing usage of event loop in concurrent execution cycle
const timedObj =  {
    song: "Hello",
    artist: "Lionel Richie",
    SpinOne : function() {
        setTimeout(() => {
            console.log(`${this.song}...`);
            this.SpinTwo();
            this.SpinThree();
        }, 2000);
    },
    SpinTwo : function() {
        setTimeout(() => {
            this.song = "Sailing";
            console.log(`${this.song}...`);
        }, 3000);
    },
    SpinThree : function() {
        console.log(`Spinning a song..`);
    },
}

console.log(timedObj.SpinOne());

//8. create an example showing usage of short hand and default param.
const showFullName = (fn = "Unk", ln = "Unk") => `My full name is ${fn} ${ln}.`;
console.log(showFullName("Mary", "Moon"));
console.log(showFullName());

//9. Create two objects with some properties and merge them using Object method and ES6 way
const student = {
    fname: "Joe Black",
}
const city = {
    loc : "Washington DC",
}
const mergeObj = Object.assign(student, city);
console.log(mergeObj);
const mergeES6 = {...student, ...city};
console.log(mergeES6);

//10. Give me an example of call and apply each with it's usage
const caller = {who : "Mickey Mouse"};
const caller2 = {who : "Minnie Mouse"};
function callMe(who) {
    return `Hello, ${this.who}.`;
}
console.log(callMe.call(caller));  
console.log(callMe.bind(caller2)()); // returns a function to call later; called immediately w/ ()