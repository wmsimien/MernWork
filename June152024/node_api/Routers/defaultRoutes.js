// use express router - class to create the route table
// define the API verbs
// doesnot need express app inovaction
// we can work same way we did with express app

const express = require("express");

let defaultRouter = express.Router({caseSensitive: true}); // can set some configuration for api at top level


// route handlers
defaultRouter.get('/', function (req, res) {
    // console.log(req);
    res.send('Hello Folks Again! Have a great day!!');
});

//http://localhost:3000/data?name=wanda&session=express
defaultRouter.get('/data', function (req, res) {

  // console.log(req);
  // console.log(res);

   let queryString = req.query;

   console.log(queryString);

   if (queryString.session == "Express") {
     res.json({ "name" : queryString.name })
   } else {
    res.json(queryString);
   }

});
  
defaultRouter.get('/nameById/:id', function (req, res) {
    let queryParam = req.params;
//  console.log(req);
    console.log(queryParam);
 
    // error handling middleware
    if (queryParam.id == 2000) {
     res.send(`<h1>User is present</h1>`);
    } else {
     res.send(`<h1>User is not present</h1>`);
    }
 
 });

 // built in middleware
 defaultRouter.use(express.json());
 defaultRouter.use(express.urlencoded({extended: true}));

 defaultRouter.post('/addUser', function (req, res) {
  let data = req.body; // pass payload; info being passed as JSON obj {}
console.log(data);
  //  res.json(data);
  res.json({ message: "Added User"});
  

});
 
// a hack to handle static files but not a feasible approach; best approach is to use middleware
defaultRouter.get('/getAlert', function (req, res) {
  // console.log(req);
//   console.log(`${__dirname}`);
  res.sendFile(`${__dirname}/public/index.html`);
});


// defaultRouter.all("*", (req, res) => {
//   res.status(404);
//   throw new Error("Route not found.");
// });

 
// this is wildcard to accept all calls
// defaultRouter.all('*', function (req, res) {
//   let data = req.body; // pass payload; info being passed as JSON obj {}
//    res.sendFile(`${__dirname}/index.html`)
// });


module.exports = defaultRouter;