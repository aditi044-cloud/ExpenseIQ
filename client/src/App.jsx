import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/expenses" element={<Expenses />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App; 