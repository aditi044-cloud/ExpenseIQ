import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Settings from "./pages/Settings";
import Budget from "./pages/Budget";
import Profile from "./pages/Profils";
import { useEffect, useState } from "react";
function PrivateRoute({
  children,
}) {

  const token =
    localStorage.getItem("token");

  return token
    ? children
    : <Navigate to="/login" />;
}
function AppContent() {
const location = useLocation();
 const [darkMode, setDarkMode] =
  useState(
    localStorage.getItem("darkMode") === "true"
  );

useEffect(() => {

  if (darkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  localStorage.setItem(
    "darkMode",
    darkMode
  );

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
      <PrivateRoute>
        <AppLayout
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        >
          <Dashboard darkMode={darkMode} />
        </AppLayout>
      </PrivateRoute>
    }
  />
    

 <Route
  path="/expenses"
  element={
    <PrivateRoute>
      <AppLayout
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      >
        <Expenses
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </AppLayout>
    </PrivateRoute>
  }
/>

  <Route
    path="/settings"
    element={
      <AppLayout
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      >
        <Settings
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
<Route
  path="/budget"
  element={
    <PrivateRoute>
      <AppLayout
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      >
        <Budget darkMode={darkMode} />
      </AppLayout>
    </PrivateRoute>
  }
/>
  <Route
  path="/profile"
  element={
    <AppLayout
      darkMode={darkMode}
      setDarkMode={setDarkMode}
    >
      <Profile
        darkMode={darkMode}
      />
    </AppLayout>
  }
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