const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let userRouter = express.Router({});

// this gives access to all the methods defined in mongoos to access mongodb data
let UserDataModel = require('../DataModels/UserDataModels');

userRouter.post('/api/signinup', (req, res) => {
  //localhost:9000/user/api/signinup
  console.log('userRoute signinup: ', req.body);

  UserDataModel.findOne({
    userName: req.body.userName,
    // password: req.body.password,
  })
    .then((existingUser) => {
      if (existingUser) {
        console.log('User registered already.', existingUser);
        res.status(409).send(existingUser);
      } else {
        // encrypt pwd
        const hashedPwd = bcrypt
          .hash(req.body.password, 10)
          .then((hashedPwd) => {
            // create new user as this is a sign up scenario
            let newUser = new UserDataModel(req.body);
            // set encrypted pwd for new user
            newUser.password = hashedPwd;

            newUser
              .save()
              .then((newUser) => {
                console.log('Successful signup with encrypted pwd ', newUser);
                res.send(newUser);
              })
              .catch((err) => {
                console.log('Error in Signup ', err);
                res.send('Error while signing up.');
              });
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
  // console.log('req.body:', req.body);

  const { username, password } = req.body;
  console.log('user and pwd:', username, password);
  if (!username || !password)
    return res
      .status(400)
      .json({ message: 'Username and password is required.' });
  console.log('userRoute userLogin: ', req.body);

  UserDataModel.findOne({
    userName: username,
    // password: req.body.password,
  })
    .then((existingUser) => {
      console.log(existingUser);
      if (existingUser) {
        bcrypt.compare(password, existingUser.password).then((match) => {
          if (match) {
            // create JWTs
            const accessToken = jwt.sign(
              {
                UserInfo: {
                  username: existingUser.userName,
                },
              },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: '60m',
              }
            );

            const refreshToken = jwt.sign(
              { username: existingUser.userName },
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: '1d' }
            );
            // saving refreshToke with current user
            existingUser.refreshToken = refreshToken;
            existingUser.save().then((result) => {
              console.log('saved refreshToken w/ user: ', result);
            });

            // create secure cookie with refresh token
            res.cookie('jwt', refreshToken, {
              httpOnly: true,
              secure: true,
              sameSite: 'None',
            });
            // send authorization access token to user
            // res.json({ existingUser, accessToken });
            res.json({ existingUser });
          } else {
            res
              .status(401)
              .send({ message: 'Username and/or password is invalid' });
          }
        });
        console.log('Sign in success ', existingUser);
        // res.status(200).send(existingUser);
      } else {
        res
          .status(401)
          .send('Error while signing in. Invalid Username and/or Password.');
      }
    })
    .catch((error) => {
      console.log(
        'User Login Credential Not Found...Consider Registering/Signing Up. ',
        error
      );
      res
        .status(400)
        .send('Error while signing in. Invalid Username and/or Password.');
    });
});

userRouter.post('/api/register', (req, res) => {
  //localhost:9000/user/api/signinup
  // json data posted from API in body
  console.log('userRoute register: ', req.body);
  //initialize the userSchema

  UserDataModel.findOne({
    userName: req.body.userName,
    password: req.body.password,
  })
    .then((existingUser) => {
      console.log(existingUser);
      if (existingUser) {
        console.log('Register user exist: ', existingUser);
        res.status(409).send(existingUser);
      } else {
        // encrypt pwd
        bcrypt.hash(req.body.password, 10).then((hashedPwd) => {
          // create new user as this is a sign up scenario
          let newUser = new UserDataModel(req.body);
          newUser.password = hashedPwd;

          newUser
            .save()
            .then((newUser) => {
              // we will get an _id once document is saved/created
              console.log('Successful signup with encrypted pwd ', newUser);
              res.send(newUser);
            })
            .catch((err) => {
              console.log('Error in Signup ', err);
              res.send('Error while signing up.');
            });
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
