import API from "../services/api";
import { useState } from "react";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  // 🟢 STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🟢 LOGIN FUNCTION
const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const response =
      await API.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

    localStorage.setItem(
      "token",
      response.data.token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(
        response.data.user
      )
    );

    alert(
      "Login Successful"
    );

    navigate("/dashboard");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Login Failed"
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

        <button type="submit">Login</button>

        <p onClick={() => navigate("/")}>
          Don't have an account? Register
        </p>
      </form>
    </div>
  );
}