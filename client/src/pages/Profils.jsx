import { useState } from "react";
import {
  FaEdit,
  FaEnvelope,
  FaCrown
} from "react-icons/fa";

import "../styles/Profile.css";


function Profile({ darkMode }) {
    const [showModal, setShowModal] = useState(false);

const [name, setName] = useState("Aditi Patel");
const [email, setEmail] = useState("aditi@example.com");
  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>

      <div className="profile-header">
        <h1>Profile</h1>

        <button
  className="edit-btn"
  onClick={() => setShowModal(true)}
>
  <FaEdit />
  Edit Profile
</button>
      </div>

      <div className="profile-card">

        <div className="profile-top">

          <div className="profile-avatar">
 {name?.charAt(0)?.toUpperCase() || "U"}
</div>
          <div className="profile-details">
            <h2>{name}</h2>
<p>
  <FaEnvelope />
  {email}
</p>

            <span className="profile-badge">
              <FaCrown />
              Free Plan
            </span>
          </div>

        </div>

        <div className="profile-stats">

          <div className="stat-card">
            <h4>Total Expenses</h4>
            <p>124</p>
          </div>

          <div className="stat-card">
            <h4>Budget Status</h4>
            <p>Active</p>
          </div>

          <div className="stat-card">
            <h4>Member Since</h4>
            <p>2025</p>
          </div>

        </div>

      </div>
      {showModal && (
  <div className="modal-overlay">

    <div className="profile-modal">

      <h2>Edit Profile</h2>

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

      <div className="modal-buttons">

        <button
          className="cancel-btn"
          onClick={() => setShowModal(false)}
        >
          Cancel
        </button>

        <button
          className="save-btn"
          onClick={() => setShowModal(false)}
        >
          Save Changes
        </button>

      </div>

    </div>

  </div>
)}

    </div>
  );
}

export default Profile;