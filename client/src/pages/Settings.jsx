import "../styles/Settings.css";

import {
 FaUser,
 FaPalette,
 FaMoneyBill,
 FaDownload,
 FaSignOutAlt,
 FaMoon
} from "react-icons/fa";

import { useState } from "react";

function Settings({darkMode,setDarkMode}) {

const [editMode,setEditMode] = useState(false);

const [name,setName] = useState("User");

const [email,setEmail] = useState("user@gmail.com");

const handleSave = () => {

  setEditMode(false);

};
const handleExport = async () => {

  const response = await fetch(
    "http://localhost:5000/expenses"
  );

  const data = await response.json();

  const csvRows = [

    ["Title","Amount","Category","Type","Date"],

    ...data.map(expense => [

      expense.title,
      expense.amount,
      expense.category,
      expense.type,
      new Date(expense.date)
      .toLocaleDateString()

    ])

  ];

  const csvContent = csvRows
    .map(row => row.join(","))
    .join("\n");

  const blob = new Blob(
    [csvContent],
    { type: "text/csv" }
  );

  const url =
    window.URL.createObjectURL(blob);

  const link =
    document.createElement("a");

  link.href = url;

  link.download = "expenses.csv";

  link.click();

};

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

        <p>
          ₹ Indian Rupee
        </p>

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