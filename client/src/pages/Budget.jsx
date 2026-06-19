import "../styles/Budget.css";
import { useEffect, useState } from "react";
import API from "../services/api";

function Budget({ darkMode }) {

  const [budget, setBudget] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const spent = expenses
    .filter((item) => item.type === "Expense")
    .reduce(
      (sum, item) =>
        sum + Number(item.amount),
      0
    );

  const remaining =
    Number(budget) - spent;

  const percentage =
    budget > 0
      ? Math.min(
          (spent / budget) * 100,
          100
        )
      : 0;

  return (
    <div
      className={`app ${
        darkMode ? "dark" : ""
      }`}
    >
      <h1> Budget Tracker</h1>

      <input
        className="budget-input"
        
        type="number"
        placeholder="Enter Monthly Budget"
        value={budget}
        onChange={(e) =>
          setBudget(e.target.value)
        }
      />

      <div className="budget-card">

         <div className="budget-stat">
    <h4>Total Budget</h4>
    <p>₹{budget}</p>
  </div>

  <div className="budget-stat">
    <h4>Spent</h4>
    <p>₹{spent}</p>
  </div>

  <div className="budget-stat">
    <h4>Remaining</h4>
    <p>₹{budget - spent}</p>
  </div>


        <div className="progress">
          <div
            className="progress-fill"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <p>
          {percentage.toFixed(1)}%
          used
        </p>

      </div>
    </div>
  );
}

export default Budget;