import "../styles/Settings.css";
function Settings({

  darkMode,
  setDarkMode,
}) {
  return (
    <div className={`settings-page ${darkMode ? "dark" : ""}`}>

      <h1>⚙️ Settings</h1>

      <div className="settings-card">

        <h3>Theme</h3>

        <p>
          Choose your preferred theme.
        </p>

        <button
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >
          {darkMode
            ? "☀️ Light Mode"
            : "🌙 Dark Mode"}
        </button>

      </div>

    </div>
  );
}

export default Settings;