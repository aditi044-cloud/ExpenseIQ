import API from "../services/api";
import { useState } from "react";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  // 🟢 STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState("");
  // 🟢 LOGIN FUNCTION
const handleLogin = async (e) => {
  e.preventDefault();

  try {

    const res = await API.post("/auth/login", {
      email,
      password,
    });

    console.log(
      "LOGIN RESPONSE FULL:",
      JSON.stringify(res.data, null, 2)
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    alert("Login Successful!");

    navigate("/expenses");


  } catch(error) {

    setError(
      error.response?.data?.message ||
      "Invalid email or password"
    );

  }
};

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {
  error && (
    <p className="error">
      {error}
    </p>
  )
}

        <button type="submit">Login</button>

        <p onClick={() => navigate("/")}>
          Don't have an account? Register
        </p>
      </form>
    </div>
  );
}