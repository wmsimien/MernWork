import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { IoIosPeople } from "react-icons/io";

import "./navmenu.css";

import AuthContext from "../../context/AuthContext";

const NavMenu = () => {
  // read value out of context
  const { loggedIn, getLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleClientInfo = () => {
    navigate("/clients");
  };

  useEffect(() => {
    getLoggedIn();
  });

  return (
    <nav>
      <Link to="/" className="title">
        <span>Shield</span>
        <img className="logo-img" src="shield.png" alt="app logo" />
      </Link>
      <div className="menuew" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/register" className="button" activeclassname="true">
            Register
          </NavLink>
        </li>
        {!loggedIn && (
          <li>
            <NavLink to="/login" className="button" activeclassname="true">
              Login
            </NavLink>
          </li>
        )}
        {loggedIn && (
          <li>
            <NavLink to="/logout" className="button" activeclassname="true">
              Logout
            </NavLink>
          </li>
        )}
      </ul>
      <div className="icons">
        <div className="icon">
          <div onClick={handleClientInfo} className="icon-img">
            <IoIosPeople />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
