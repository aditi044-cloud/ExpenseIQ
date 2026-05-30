import "../styles/Dashboard.css";
import { useEffect, useState } from "react";
import API from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";  

function Dashboard({ darkMode }) {

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {

    fetchExpenses();

  }, []);

  const fetchExpenses = async () => {

    try {

      const response = await API.get("/expenses");

      setExpenses(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // TOTAL

  const totalExpense = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount),
    0
  );

  // HIGHEST EXPENSE

  const highestExpense =
    expenses.length > 0
      ? Math.max(
          ...expenses.map((e) =>
            Number(e.amount)
          )
        )
      : 0;
      // PIE CHART DATA

const pieData = expenses.map((expense) => ({
  name: expense.title,
  value: Number(expense.amount),
}));

// BAR CHART DATA

const barData = expenses.map((expense) => ({
  title: expense.title,
  amount: Number(expense.amount),
}));

const COLORS = [
  "#4f46e5",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
];

  return (

<div
  className={`app ${darkMode ? "dark" : ""}`}
>

      <h1
        style={{
          marginBottom: "34px",
        }}
      >
        Dashboard
      </h1>

      {/* CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >

        <div className={`dashboard-card ${darkMode ? "dark" : ""}`}>
          <h3>Total Expenses</h3>
          <h2>₹{totalExpense}</h2>
        </div>

        <div className={`dashboard-card ${darkMode ? "dark" : ""}`}>
          <h3>Transactions</h3>
          <h2>{expenses.length}</h2>
        </div>

        <div className={`dashboard-card ${darkMode ? "dark" : ""}`}>
          <h3>Highest Expense</h3>
          <h2>₹{highestExpense}</h2>
        </div>

      </div>

      {/* RECENT TRANSACTIONS */}

      <div
        className={`transactions-box ${darkMode ? "dark" : ""}`}
      >

        <h2
          style={{
            marginBottom: "20px",
            fontSize: "20px",
          }}
        >
          Recent Transactions
        </h2>

        {expenses.slice(0, 5).map((expense) => (

          <div
            key={expense._id}
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              padding: "12px 0",
              borderBottom:
                "1px solid #eee",
            }}
          >

            <span>{expense.title}</span>

            <strong>
              ₹{expense.amount}
            </strong>

          </div>

        ))}

      </div>
      <div
  style={{
    marginTop: "40px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "20px",
  }}
>

  {/* PIE CHART */}

  <div
    className={`chart-box ${darkMode ? "dark" : ""}`}
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "15px",
      boxShadow:
        "0 2px 10px rgba(0,0,0,0.08)",
    }}
  >

    <h2
      style={{
        marginBottom: "20px",
        fontSize: "20px",
      }}
    >
      Expense Breakdown
    </h2>

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <PieChart>

        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >

          {pieData.map((entry, index) => (

            <Cell
              key={index}
              fill={
                COLORS[
                  index % COLORS.length
                ]
              }
            />

          ))}

        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>

    </ResponsiveContainer>

  </div>

  {/* BAR CHART */}

  <div
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "15px",
      boxShadow:
        "0 2px 10px rgba(0,0,0,0.08)",
    }}
  >

    <h2
      style={{
        marginBottom: "20px",
        fontSize: "20px",
        color: darkMode ? "#9ca3af" : "#000",
      }}
    >
      Expense Analytics
    </h2>

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <BarChart data={barData}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
  dataKey="title"
  stroke={darkMode ? "#fff" : "#000"}
/>

        <YAxis stroke={darkMode ? "#fff" : "#000"} />

        <Tooltip />

        <Bar dataKey="amount" fill="#4f46e5" />

      </BarChart>

    </ResponsiveContainer>

  </div>

</div>

    </div>
    

  );

}

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "15px",
  boxShadow:
    "0 2px 10px rgba(0,0,0,0.08)",
};

export default Dashboard;