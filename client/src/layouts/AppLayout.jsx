import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function AppLayout({ darkMode, setDarkMode }) {
  return (
    <div className="app-layout">

      <Sidebar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="main-layout">
        <Outlet />
      </div>

    </div>
  );
}

export default AppLayout;