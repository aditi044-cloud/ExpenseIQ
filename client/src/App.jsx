import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import { useEffect, useState } from "react";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <BrowserRouter>

 <Sidebar
  darkMode={darkMode}
  setDarkMode={setDarkMode}
/>

  <Routes>

    <Route path="/" element={<Landing />} />

    <Route
  path="/dashboard"
  element={
    <Dashboard
      darkMode={darkMode}
    />
  }
/>

    <Route path="/expenses" element={<Expenses darkMode={darkMode} setDarkMode={setDarkMode} />} />

    <Route path="/login" element={<Login />} />

    <Route path="/register" element={<Register />} />

  </Routes>

</BrowserRouter>
  );
}

export default App; 