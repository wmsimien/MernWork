import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { SaveUserToDB } from '../../../state/User/userAction';

let UserHook = () => {
  //subscribe and read from userReducer using useSelector
  // reads defined data in reducer
  let User = useSelector((store) => store.userReducer.user);

  // user.userName -> defined in userReducer
  let [uName, setUserName] = useState('');
  // initializes state and returns a callback which we can use to update the state
  let [pass, setPassword] = useState('');
  let [street, setStreet] = useState('');
  let [mobile, setPhone] = useState('');

  const navigate = useNavigate();

  // this makes the component as publisher for the data back to store -> dispatches
  const dispatchToDB = useDispatch();

  const loginUser = (evt) => {
    evt.preventDefault();
    let newUser = {
      userName: uName,
      password: pass,
      street,
      mobile,
    };
    console.log('newUser: ', newUser);
    if (
      newUser.userName !== '' ||
      newUser.password !== '' ||
      newUser.street !== '' ||
      newUser.mobile !== ''
    ) {
      dispatchToDB(SaveUserToDB(newUser));
      navigate('/userLogin');
    } else {
      alert('Please complete user sign up by filling in all fields.');
    }
  };

  // controlled approach
  return (
    <>
      <h1>User SignUp Page</h1>
      <section className={'componentClass'}>
        <div className="form col-md-8">
          <div className="col-md-12">
            <b>User Name</b>
            <input
              type="text"
              className="form-control col-md-6 username"
              value={uName} //state to update the userName
              placeholder="User Name"
              onChange={(evt) => setUserName(evt.target.value)}
              maxLength={40}
            />
          </div>
          <div className="col-md-12">
            <b>Password</b>
            <input
              type="password"
              className="form-control col-md-6 pass"
              value={pass}
              placeholder="Password"
              onChange={(evt) => setPassword(evt.target.value)}
              maxLength={40}
            />
          </div>
          <div className="col-md-12">
            <b>Street </b>
            <input
              type="text"
              className="form-control col-md-6 street"
              value={street}
              placeholder="Street Name"
              onChange={(evt) => setStreet(evt.target.value)}
            />
          </div>

          <div className="col-md-12">
            <b>Mobile </b>
            <input
              type="text"
              className="form-control col-md-6 mobile"
              value={mobile}
              placeholder="Mobile"
              maxLength={11}
              onChange={(evt) => setPhone(evt.target.value)}
            />
          </div>
          <input
            type="button"
            className={'btn btn-primary col-md-2 saveUser'}
            value={'SignUp'}
            onClick={loginUser}
          />
        </div>
      </section>
    </>
  );
};

export default UserHook;
