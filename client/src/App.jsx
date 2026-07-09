import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";
import { useEffect, useState } from "react";

import AppLayout from "./layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <Routes>

      {/* PUBLIC ROUTES (NO SIDEBAR) */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PROTECTED LAYOUT ROUTES */}
      <Route
  element={
    <ProtectedRoute>
      <AppLayout
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </ProtectedRoute>
  }
>
        <Route
          path="/dashboard"
          element={<Dashboard darkMode={darkMode} />}
        />

        <Route
          path="/expenses"
          element={<Expenses darkMode={darkMode} />}
        />

        <Route
          path="/settings"
          element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />}
        />

        <Route
          path="/profile"
          element={<Profile darkMode={darkMode} />}
        />
      </Route>

    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}