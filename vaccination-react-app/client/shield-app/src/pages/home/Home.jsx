import { useEffect, useContext } from 'react';
import './home.css';
import Hero from './hero/Hero';

import AuthContext from '../../context/AuthContext';

const Home = () => {
  const { isLoggedIn, getLoggedIn } = useContext(AuthContext);

  const check = () => {
    getLoggedIn();
  };

  useEffect(() => {
    check();
  }, []);

  return <div className="home">{<Hero />}</div>;
};

export default Home;
