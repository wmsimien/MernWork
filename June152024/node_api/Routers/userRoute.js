const express = require('express');

let userRouter = express.Router({}); //

// this gives access to all the methods defined in mongoos to access mongodb data
let UserDataModel = require('../DataModels/UserDataModels');

// we'll accept the user object as req.body, use ti to map w/ user.schema key valu pair
// initialize the userModel, if no validation error, then use the mongoose method to save user
userRouter.post('/api/signinup', (req, res) => {
  //localhost:9000/user/api/signinup
  // json data posted from API in body
  console.log('userRoute: ', req.body);
  //initialize the userSchema

  UserDataModel.findOne({
    userName: req.body.userName,
    password: req.body.password,
  })
    .then((existingUser) => {
      console.log(existingUser);
      if (existingUser) {
        console.log('Sign in success ', existingUser);
        res.send(existingUser);
      } else {
        // create new user as this is a sign up scenario
        let newUser = new UserDataModel(req.body);

        newUser
          .save()
          .then((newUser) => {
            // we will get an _id once document is saved/created
            console.log('Successful signup ', newUser);
            res.send(newUser);
          })
          .catch((err) => {
            console.log('Error in Signup ', err);
            res.send('Error while signing up.');
          });
      }
    })
    .catch((err2) => {
      console.log('Error in Signin ', err2);
      res.send('Error while signing in.');
    });
});

userRouter.post('/api/userLogin', (req, res) => {
  //localhost:9000/user/api/userLogin
  // json data posted from API in body
  console.log('userRoute: ', req.body);
  //initialize the userSchema
  UserDataModel.findOne({
    userName: req.body.username,
    password: req.body.password,
  })
    .then((existingUser) => {
      console.log(existingUser);
      if (existingUser) {
        console.log('Sign in success ', existingUser);
        res.status(200).send(existingUser);
      } else {
        res
          .status(400)
          .send('Error while signing in.  Invalid Username and/or Password.');
      }
      // else {
      //   // create new user as this is a sign up scenario
      //   let newUser = new UserDataModel(req.body);

      //   newUser
      //     .save()
      //     .then((newUser) => {
      //       // we will get an _id once document is saved/created
      //       console.log('Successful signup ', newUser);
      //       res.send(newUser);
      //     })
      //     .catch((err) => {
      //       console.log('Error in Signup ', err);
      //       res.send('Error while signing up.');
      //     });
      // }
    })
    .catch((error) => {
      console.log(
        'User Login Credential Not Found...Consider Registering/Signing Up. ',
        error
      );
      res
        .status(400)
        .send('Error while signing in.  Invalid Username and/or Password.');
    });
});

userRouter.post('/api/register', (req, res) => {
  //localhost:9000/user/api/signinup
  // json data posted from API in body
  console.log('userRoute: ', req.body);
  //initialize the userSchema

  UserDataModel.findOne({
    userName: req.body.userName,
    password: req.body.password,
  })
    .then((existingUser) => {
      console.log(existingUser);
      if (existingUser) {
        console.log('Sign in success ', existingUser);
        res.send(existingUser);
      } else {
        // create new user as this is a sign up scenario
        let newUser = new UserDataModel(req.body);

        newUser
          .save()
          .then((newUser) => {
            // we will get an _id once document is saved/created
            console.log('Successful signup ', newUser);
            res.send(newUser);
          })
          .catch((err) => {
            console.log('Error in Signup ', err);
            res.send('Error while signing up.');
          });
      }
    })
    .catch((err2) => {
      console.log('Error in Signin ', err2);
      res.send('Error while signing in.');
    });
});

// code to fetch all the users from user collecrtion and return back
userRouter.get('/api/users', (req, res) => {
  UserDataModel.find()
    .then((allUsers) => {
      res.send(allUsers);
    })
    .catch(() => {
      res.send('Error while fetch all users.');
    });
});

module.exports = userRouter;
