import { useSelector } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import NavMenu from "./components/navbar/NavMenu";
import Home from "./pages/home/Home";
import Clients from "./pages/clients/Clients";
import BarGender from "./pages/reports/BarCharts/BarGender";
import PieGender from "./pages/reports/PieCharts/PieGender";
import HealthFacilities from "./pages/healthFacilities/HealthFacilities";
import HealthFacilitiesSearch from "./pages/healthFacilities/HealthFacilitiesSearch";
import HealthFacilitiesUpdate from "./pages/healthFacilities/HealthFacilitiesUpdate";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Vaccines from "./pages/vaccines/Vaccines";
import VaccineSearch from "./pages/vaccines/VaccineSearch";
import VaccineUpdate from "./pages/vaccines/VaccineUpdate";
import AppointmentSearchZipCode from "./pages/appointment/AppointmentSearchZipCode";

import { AuthContextProvider } from "./context/AuthContext";

import "./App.css";
import HealthFacilitiesListByZip from "./pages/healthFacilities/HealthFacilitiesListByZip";
import HealthFacilitiesListByZipTbl from "./pages/healthFacilities/HealthFacilitiesListByZipTbl";
import AppointmentSelection from "./pages/appointment/AppointmentSelection";
import Logout from "./pages/logout/Logout";
import AppointmentConfirmation from "./pages/appointment/AppointmentConfirmation";
import Payment from "./pages/payment/Payment";
import AppointmentListing from "./pages/appointment/AppointmentListing";

// to house common components
const Layout = () => {
  return (
    <div className="main">
      <NavMenu />
      <div className="container">
        <div className="menuContainer">
          <Menu />
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

function App() {
  const { clientId } = useSelector((state) => state.clientAuthReducer);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/clients",
          element: <Clients clientId={clientId} />,
        },
        {
          path: "/appointmentZipCodeSearch",
          element: <AppointmentSearchZipCode />,
        },
        {
          path: "/appointmentSelection",
          element: <AppointmentSelection />,
        },
        {
          path: "/appointmentConfirmation",
          element: <AppointmentConfirmation />,
        },
        {
          path: "/appointmentListing",
          element: <AppointmentListing />,
        },
        {
          path: "/payment",
          element: <Payment />,
        },
        {
          path: "/vaccines",
          element: <Vaccines />,
        },
        {
          path: "/vaccineSearch",
          element: <VaccineSearch />,
        },
        {
          path: "/vaccineUpdate",
          element: <VaccineUpdate />,
        },
        {
          path: "/healthFacilities",
          element: <HealthFacilities />,
        },
        {
          path: "/healthFacilitiesSearch",
          element: <HealthFacilitiesSearch />,
        },
        {
          path: "/healthFacilitiesUpdate",
          element: <HealthFacilitiesUpdate />,
        },
        {
          path: "/healthFacilitiesListByZip",
          element: <HealthFacilitiesListByZip />,
        },
        {
          path: "/healthFacilitiesListByZipTbl",
          element: <HealthFacilitiesListByZipTbl />,
        },
        {
          path: "/genderBarChart",
          element: <BarGender />,
        },
        {
          path: "/genderPieChart",
          element: <PieGender />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
  ]);

  return (
    <AuthContextProvider>
      {/* child */}
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;
