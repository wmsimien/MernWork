import React from 'react';
import { NavLink } from 'react-router-dom';

// replacement of mapStatToProps
import { useSelector } from 'react-redux';

let Header = (props) => {
  /*
  allows us to read data from store/reducer as we do with mapStateToProps
  */
  const user = useSelector((store) => store.userReducer.user);

  const userName = user && user.userName ? user.userName : props.userName;

  return (
    <>
      <h3 className="header">
        Hello, {userName}, Welcome to Shopping Cart sponsored by SimTechs.
      </h3>
      <div>
        <NavLink to="/home" className="button" activeclassname="true">
          Home
        </NavLink>
        <NavLink to="/user" className="button" activeclassname="true">
          Login
        </NavLink>
        <NavLink to="/about" className="button" activeclassname="true">
          About
        </NavLink>
        {user.userName && user.password && (
          <NavLink to="/product" className="button" activeclassname="true">
            Product
          </NavLink>
        )}
      </div>
      <hr />
    </>
  );
};

export default Header;
