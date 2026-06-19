import { Link, useLocation } from "react-router-dom";

import {
  FaWallet,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaMoneyBillWave,
} from "react-icons/fa";
import { FaBullseye } from "react-icons/fa";
import "../styles/Sidebar.css";

function Sidebar({ darkMode }) {

  const location = useLocation();

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
        <Link
  to="/budget"
  className={
    location.pathname === "/budget"
      ? "active"
      : ""
  }
>
   <FaMoneyBillWave />
  <span>Budget</span>
</Link>

        <Link to="/settings">

          <FaCog />
          <span>Settings</span>

        </Link>


        {/* <Link
  to="/profile"
  className={
    location.pathname === "/profile"
      ? "active"
      : ""
  }
>
  <FaUserCircle />
  <span>Profile</span>
</Link> */}


      </div>

      {/* USER SECTION */}
      <div className="sidebar-bottom">

  <Link to="/profile" className="profile-link">

    <div className="profile">

      <FaUserCircle />

      <div>
        <h4>User</h4>
        <p>Free Plan</p>
      </div>

    </div>

  </Link>

  <button
  className="logout-btn"
  onClick={() => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href =
      "/login";

  }}
>

    <FaSignOutAlt />
    Logout

  </button>

</div>

    </div>

  );

}

export default Sidebar;