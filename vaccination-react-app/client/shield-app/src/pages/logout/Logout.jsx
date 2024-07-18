import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logOut } from '../../state/auth/authActions';

//https://sonner.emilkowal.ski/toast
import { toast, Toaster } from 'sonner';

import './logout.css';

const Logout = () => {
  const dispatch = useDispatch();

  let handleSignOut = (e) => {
    dispatch(logOut());
  };

  useEffect(() => {
    handleSignOut();
  }, []);

  return (
    <div className="logoutContainer">
      <div className="header">
        <div className="text">Signed Out</div>
        <div className="underline"></div>
      </div>

      <div className="logout-container">
        <p>
          Stay up to date with{' '}
          <span>
            <em>vaccinations</em>
          </span>
          .
        </p>
      </div>
      <div className="logout-links">
        <span>
          Go <Link to="/login">Sign In</Link>
        </span>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default Logout;
