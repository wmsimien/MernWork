import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  SaveUserToDB,
  SaveUserToDBUsingFetch,
} from '../../../state/User/userAction';

let UserHook = (props) => {
  // let [userName, setUserName] = useRef(null);

  //subscribe and read from userReducer using useSelector
  // reads defined data in reducer
  let User = useSelector((store) => store.userReducer.user);

  // user.userName -> defined in userReducer
  let [uName, setUserName] = useState(User.userName);
  // initializes state and returns a callback which we can use to update the state
  let [pass, setPassword] = useState(User.password);
  let [street, setStreet] = useState(User.street);
  let [mobile, setPhone] = useState(User.mobile);

  let onTextChange = (evt) => {
    evt.preventDefault();

    let val = evt.target.value;

    setUserName(val);
  };

  // this makes the component as publisher for the data back to store -> dispatches
  let dispatchToDB = useDispatch();

  let loginUser = (evt) => {
    evt.preventDefault();
    let newUser = {
      userName: uName,
      password: pass,
      street,
      mobile,
    };
    dispatchToDB(SaveUserToDB(newUser));
    // dispatchToDB(SaveUserToDBUsingFetch(newUser));
  };

  //below is useRef help
  //the reference implemenation
  let sessionName = useRef(null);
  let todaysTopic = useRef(null);

  //we can't access the element as it is not rendered yet
  //sessionName.current.value = User.userName

  //shouldcomponentUpdate, componentDidMount
  //default it is shouldcomponentUpdate
  //when first rendering is done and UI can be accessed - componentDidMount
  //useeffect is the hook that we use to make it work as shouldComponentUpdate, componentDidMount, componentWillUnmount
  //using useEffect to implement componentDidMount and then add the value to ref element
  // useEffect(() => {
  //   console.log('Re render happened');

  //   sessionName.current.value = User.userName;

  //   //componentWillUnmount
  //   return () => {
  //     // clear intervals, api subscription etc that whould be removed
  //     // before we move to next component
  //     console.log('Makes useEffect to work for componentWillUnmount');
  //   };
  // }, []); // if we pass an object to initialize, it works as componentDidMount
  // and executes in create LC; also works as shouldComponentUpdate

  let readFormData = (evt) => {
    evt.preventDefault();
    alert(sessionName.current.value);
    //can be dispatched data back to the store or db
  };

  // controlled approach
  return (
    <>
      <h1>User Login Page</h1>
      <section className={'componentClass'}>
        <div className="form col-md-8">
          <div className="col-md-12">
            <b>User Name</b>
            <input
              type="text"
              className="form-control col-md-6 username"
              value={uName} //state to update the userName
              placeholder="User Name"
              onChange={onTextChange}
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
              type="number"
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
            value={'SignIn-Up'}
            onClick={loginUser}
          />
        </div>

        {/* uncontrolled way by using ref keyword */}
        {/* <form className={'form col-md-10 userHook'} onSubmit={readFormData}>
          <label>
            <b>User Name :</b>
            <input
              type="text"
              className={'form-control col-md-12'}
              ref={sessionName}
              placeholder="Please enter session name"
              maxLength={20}
              required
            />
          </label>
          <br />
          <label>
            <b>Password :</b>
            <input
              type="password"
              className={'form-control col-md-12'}
              ref={todaysTopic}
              placeholder="Please enter today's topic"
              maxLength={20}
              required
            />
          </label>
          <br />
          <input type="submit" className={'btn btn-primary'} value="SignIn" />
        </form> */}
      </section>
    </>
  );
};

export default UserHook;
