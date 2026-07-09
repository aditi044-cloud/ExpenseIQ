import "../styles/Settings.css";

import {
 FaUser,
 FaPalette,
 FaMoneyBill,
 FaDownload,
 FaSignOutAlt,
 FaMoon
} from "react-icons/fa";

import { useState, useEffect } from "react";
import API from "../services/api";

function Settings({darkMode,setDarkMode}) {

const [editMode,setEditMode] = useState(false);

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [currency, setCurrency] = useState("INR");

const handleSave = () => {

  setEditMode(false);

};
const handleExport = async () => {

  try {

    const response = await API.get("/expenses");

    const data = response.data;

    const csvRows = [

      ["Title","Amount","Category","Type","Date"],

      ...data.map(expense => [

        expense.title,
        expense.amount,
        expense.category,
        expense.type,
        new Date(expense.date).toLocaleDateString()

      ])

    ];

    const csvContent = csvRows
      .map(row => row.join(","))
      .join("\n");

    const blob = new Blob(
      [csvContent],
      { type: "text/csv" }
    );

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "expenses.csv";
    link.click();

  }

  catch(error){

    console.log(error);

    alert("Unable to export expenses.");

  }

};
useEffect(() => {

  const fetchUser = async () => {

    try {

      const res = await API.get("/auth/me");

      setName(res.data.name);
      setEmail(res.data.email);
      setCurrency(res.data.currency);

    } catch (error) {

      console.log(error);

    }

  };

  fetchUser();

}, []);

return (

<div className={`settings-page ${darkMode ? "dark" : ""}`}>

  {/* HEADER */}
  <div className="settings-header">

    <div>
      <h1>Settings</h1>
      <p>Manage your account and preferences</p>
    </div>

    <div className="theme-toggle">
      <FaMoon />

      <label className="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <span className="slider"></span>
      </label>
    </div>

  </div>

  {/* ACCOUNT */}
  <div className="settings-section">

    <div className="section-header">

      <h2>
        <FaUser />
        Account
      </h2>

      <button
        className="edit-btn"
        onClick={() => {

          if (editMode) {
            handleSave();
          } else {
            setEditMode(true);
          }

        }}
      >
        {editMode ? "Save Changes" : "Edit"}
      </button>

    </div>

    <div className="setting-item">

      <div>

        <h4>
          Name
        </h4>

        {
          editMode ?

          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

          :

          <p>
            {name}
          </p>

        }

      </div>

    </div>

    <div className="setting-item">

      <div>

        <h4>
          Email
        </h4>

        {

          editMode ?

          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          :

          <p>
            {email}
          </p>

        }

      </div>

    </div>

  </div>

  {/* FINANCE */}
  <div className="settings-section">

    <h2>

      <FaMoneyBill/>

      Expense Preferences

    </h2>

    <div className="setting-item">

      <div>

        <h4>
          Currency
        </h4>

        {editMode ? (
  <select
    value={currency}
    onChange={(e) => setCurrency(e.target.value)}
  >
    <option value="INR">INR (₹)</option>
    <option value="USD">USD ($)</option>
    <option value="EUR">EUR (€)</option>
    <option value="GBP">GBP (£)</option>
  </select>
) : (
  <p>{currency}</p>
)}

      </div>

    </div>

    <div className="setting-item">

      <div>

        <h4>
          Default Category
        </h4>

        <p>
          Food
        </p>

      </div>

    </div>

  </div>

  {/* DATA */}
  <div className="settings-section">

    <h2>

      <FaDownload/>

      Data

    </h2>

    <button className="primary" onClick={handleExport}>

      Export Expenses

    </button>

    <button className="danger">

      <FaSignOutAlt/>

      Logout

    </button>

  </div>

</div>

);

}

export default Settings;