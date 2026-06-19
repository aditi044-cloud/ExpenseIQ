// export default function Register() {
//   return <h1>Register Page</h1>;
// }
import API from "../services/api";
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
 const handleRegister = async (e) => {

  e.preventDefault();

  try {

    const response =
      await API.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

    alert(
      "Registration Successful"
    );

    navigate("/login");

  } catch (error) {

    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );

  }

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