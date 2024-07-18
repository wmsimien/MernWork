import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdOutlineVaccines } from "react-icons/md";
import { GiHospitalCross } from "react-icons/gi";
import { IoBarChartSharp } from "react-icons/io5";
import { IoIosPeople } from "react-icons/io";

import "./menu.css";

import AuthContext from "../../context/AuthContext";

import { getCredentials } from "../../state/auth/authActions";

const Menu = () => {
  const loggedInClient = useSelector(
    (state) => state.clientSignInReducer.client
  );
  console.log("loggedInClient", loggedInClient);
  let location = useLocation();

  // read value out of context
  const { loggedIn, getLoggedIn } = useContext(AuthContext);

  let results = {};
  const getLoggedInInfo = async () => {
    try {
      results = await getCredentials(
        location.state.username,
        location.state.password
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <div className="menu">
      <div className="item">
        <span className="title">main</span>
        <Link to="/" className="listItem">
          <FaHome />
          <span>Home</span>
        </Link>
      </div>
      {loggedIn && loggedInClient && (
        <>
          <div className="item">
            <span className="title">clients</span>
            {loggedInClient?.roles === "user" && (
              <Link to="/appointmentZipCodeSearch" className="listItem">
                <FaHome />
                <span>Make Appointment</span>
              </Link>
            )}
            {loggedInClient?.roles === "admin" && (
              <Link to="/appointmentListing" className="listItem">
                <IoIosPeople />
                <span>Client Appointments</span>
              </Link>
            )}
          </div>
          {loggedInClient.roles === "admin" && (
            <>
              <div className="item">
                <span className="title">Vaccines</span>
                <Link to="/vaccineSearch" className="listItem">
                  <MdOutlineVaccines />
                  <span>Search & Update Vaccine</span>
                </Link>
                <Link to="/vaccines" className="listItem">
                  <MdOutlineVaccines />
                  <span>Add Vaccine</span>
                </Link>
              </div>
              <div className="item">
                <span className="title">Health Facilities</span>
                <Link to="/healthFacilitiesSearch" className="listItem">
                  <GiHospitalCross />
                  <span>Search & Update Health Facility</span>
                </Link>
                <Link to="/healthFacilities" className="listItem">
                  <GiHospitalCross />
                  <span>Add Health Facility</span>
                </Link>
              </div>

              <div className="item">
                <span className="title">Reports</span>
                <Link to="/genderBarChart" className="listItem">
                  <IoBarChartSharp />
                  <span>By Gender Bar Chart</span>
                </Link>
                <Link to="/genderPieChart" className="listItem">
                  <IoBarChartSharp />
                  <span>By Gender Pie Chart</span>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div> // end of menue
  );
};

export default Menu;
