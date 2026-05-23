// export default function Register() {
//   return <h1>Register Page</h1>;
// }
import { useState } from "react";
import "../styles/Auth.css";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  // 🟢 STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🟢 HANDLE SUBMIT
  const handleRegister = (e) => {
    e.preventDefault();

    // 🔴 VALIDATION
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // 🟢 STORE USER (TEMP - localStorage)
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registered Successfully!");

    // 🔁 REDIRECT TO LOGIN
    navigate("/login");
  };

  // 🟢 UI
  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="submit">Register</button>

        <p onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>
      </form>
    </div>
  );
}