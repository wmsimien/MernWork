import { createContext, useEffect, useState } from 'react';

import axios from 'axios';

const BASE_URL = `http://localhost:9000/api`;

// allows axios to set credentials/cookies
axios.defaults.withCredentials = true;
/* Application wide state; thus all components will be able to see if a client is logged is */
const AuthContext = createContext({}); // returns an object of all the features of context

// will provide true/false to other components if client is logged in
const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(undefined);

  const getLoggedIn = async () => {
    try {
      const loggedInRes = await axios.get(`${BASE_URL}/auth/loggedIn`);
      setLoggedIn(loggedInRes?.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  // run on initial mounting
  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
