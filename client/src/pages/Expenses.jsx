function Expenses() {
  return (
    <div>
      <h2>Expenses</h2>

      <div className="controls">
        <input placeholder="Title" />
        <input placeholder="Amount" />
        <button>Add</button>
      </div>

      <ul>
        <li>Food - $50</li>
        <li>Salary + $500</li>
      </ul>
    </div>
  );
}

export default Expenses;



// {/* <div className={`app ${darkMode ? "dark" : ""}`}>

//   {/* HEADER */}
//   <div className="header">
//     <h1>📊 Expense Dashboard</h1>

//     <label className="switch">
//       <input
//         type="checkbox"
//         checked={darkMode}
//         onChange={() => setDarkMode(!darkMode)}
//       />
//       <span className="slider"></span>
//     </label>
//   </div>

//   {/* SUMMARY CARDS */}
//   <div className="dashboard">
//     <div className="card">💰 Total: ${total}</div>
//     <div className="card">📉 Expenses: ${expensesTotal}</div>
//     <div className="card">📈 Income: ${incomeTotal}</div>
//   </div>

//   {/* CONTROLS */}
//   <div className="controls">

//     <div className="form">
//       <input type="text" placeholder="Title" />
//       <input type="number" placeholder="Amount" />
//       <select>
//         <option>Expense</option>
//         <option>Income</option>
//       </select>
//       <button>Add</button>
//     </div>

//     <input
//       type="text"
//       className="search"
//       placeholder="Search expenses..."
//     />

//     <div className="filters">
//       <button>All</button>
//       <button>Income</button>
//       <button>Expense</button>
//     </div>

//     <select className="sort">
//       <option>Sort by Date</option>
//       <option>Sort by Amount</option>
//     </select>

//   </div>

//   {/* ANALYTICS */}
//   <div className="analytics">

//     <div className="insights">
//       <h3>Insights</h3>
//       <p>Top category: Food</p>
//       <p>Biggest expense: $200</p>
//     </div>

//     <div className="charts">
//       <div className="chart">Bar Chart</div>
//       <div className="chart">Pie Chart</div>
//     </div>

//   </div>

//   {/* TRANSACTIONS */}
//   <div className="transactions">
//     <h3>Transactions</h3>
//     <ul>
//       <li>Food - $50</li>
//       <li>Salary + $500</li>
//     </ul>
//   </div>

// </div> */}