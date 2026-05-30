import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";

import { useEffect, useState } from "react";

function AppContent() {

  const [darkMode, setDarkMode] =
    useState(false);

  const location = useLocation();

  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

  }, [darkMode]);

  /* PAGES WHERE SIDEBAR SHOULD NOT SHOW */
  const hideSidebarRoutes = [
    "/",
    "/login",
    "/register",
  ];

  const showSidebar =
    !hideSidebarRoutes.includes(
      location.pathname
    );

  return (

    <>

      {/* SIDEBAR */}
      {showSidebar && (

        <Sidebar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

      )}

      {/* ROUTES */}
      <Routes>

        <Route
          path="/"
          element={<Landing />}
        />

  <Route
  path="/dashboard"
  element={
    <AppLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    >

      <Dashboard
        darkMode={darkMode}
      />

    </AppLayout>
  }
/>

<Route
  path="/expenses"
  element={
    <AppLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    >

      <Expenses
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

    </AppLayout>
  }
/>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>

    </>

  );

}

function App() {

  return (

    <BrowserRouter>

      <AppContent />

    </BrowserRouter>

  );

}

export default App;