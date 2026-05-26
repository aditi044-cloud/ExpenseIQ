import { useState } from "react";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  // 🟢 STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🟢 LOGIN FUNCTION
  const handleLogin = (e) => {
    e.preventDefault();

    // 1. Get stored user
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // 2. Check if user exists
    if (!storedUser) {
      alert("No user found. Please register first.");
      return;
    }

    // 3. PASSWORD MATCHING (IMPORTANT)
    if (
      email === storedUser.email &&
      password === storedUser.password
    ) {
      // ✅ LOGIN SUCCESS

      localStorage.setItem("isLoggedIn", "true");

      alert("Login Successful!");

      navigate("/expenses");

    } else {
      // ❌ WRONG CREDENTIALS
      alert("Invalid email or password");
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