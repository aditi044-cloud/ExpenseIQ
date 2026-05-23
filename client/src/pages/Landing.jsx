import { Link } from "react-router-dom";
import "../styles/Landing.css";

export default function Landing() {
  return (
    <div className="landing">
      
      {/* Navbar */}
      <nav className="nav">
        <h2 className="logo">ExpenseIQ</h2>

        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register" className="btn">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <h1>
          Expense <span>IQ</span>
        </h1>

        <p>
          Track your expenses smartly. Simple, fast, and beautiful.
        </p>

        <div className="hero-buttons">
          <Link to="/register" className="btn big">Get Started</Link>
          <Link to="/login" className="outline">Login</Link>
        </div>
      </div>

    </div>
  );
}