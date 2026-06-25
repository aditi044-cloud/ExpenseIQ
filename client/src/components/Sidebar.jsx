import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  FaWallet,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

import "../styles/Sidebar.css";


function Sidebar({ darkMode }) {

  const location = useLocation();
  const navigate = useNavigate();

  const [openProfile, setOpenProfile] = useState(false);


  return (

    <div className={`sidebar ${darkMode ? "dark" : ""}`}>

      {/* LOGO */}
      <div className="sidebar-logo">

        <h2>ExpenseIQ</h2>

      </div>



      {/* NAVIGATION */}
      <div className="sidebar-links">


        <Link
          to="/expenses"
          className={
            location.pathname === "/expenses"
            ? "active"
            : ""
          }
        >

          <FaWallet />
          <span>Expenses</span>

        </Link>



        <Link
          to="/dashboard"
          className={
            location.pathname === "/dashboard"
            ? "active"
            : ""
          }
        >

          <FaChartPie />
          <span>Dashboard</span>

        </Link>



        <Link to="/settings">

          <FaCog />
          <span>Settings</span>

        </Link>


      </div>




      {/* USER SECTION */}

      <div className="sidebar-bottom">


        <div
          className="profile"
          onClick={() => setOpenProfile(!openProfile)}
        >

          <FaUserCircle />


          <div>

            <h4>User</h4>
            <p>Free Plan</p>

          </div>


        </div>



        {
 openProfile && (

  <div className="profile-menu">


    <button
      onClick={() => navigate("/profile")}
    >
      Profile
    </button>


    <button className="logout-dropdown">

      <FaSignOutAlt/>
      Logout

    </button>


  </div>

 )
}



      </div>


    </div>

  );

}


export default Sidebar;