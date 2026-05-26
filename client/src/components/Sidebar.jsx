import { Link, useLocation } from "react-router-dom";

function Sidebar({
  darkMode,
  setDarkMode,
}) {

  const location = useLocation();

  const linkStyle = (path) => ({
    color: darkMode ? "black" : "white",
    textDecoration: "none",
    padding: "14px 22px",
    margin: "6px 12px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    background:
    location.pathname === path
      ? (darkMode ? "#d1d5db" : "#1d2f49")
      : "transparent",
  transition: "0.3s",
  });

  return (

    <div
      style={{
        width: "220px",
        height: "100vh",
        background: darkMode ? "linear-gradient(to bottom, #0f172a, #1e293b)" : "#111827",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        paddingTop: "25px",
        zIndex: 9999,
        borderRight: darkMode ? "1px solid #e5e7eb" : "1px solid #1f2937",
    transition: "0.3s",
      }}
    >

      <h2
        style={{
          color: darkMode ? "white" : "white",
          paddingLeft: "22px",
          marginBottom: "35px",
          fontWeight: "600",
          letterSpacing: "1px",
        }}
      >
        ExpenseIQ
      </h2>


      <Link
        to="/expenses"
        style={linkStyle("/expenses")}
      >
        Expenses
      </Link>

      <Link
        to="/dashboard"
        style={linkStyle("/dashboard")}
      >
        Dashboard
      </Link>

    </div>

  );

}

export default Sidebar;