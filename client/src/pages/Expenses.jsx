import "../styles/Expenses.css";
import { useEffect, useState } from "react";
import API from "../services/api";

function Expenses({ darkMode, setDarkMode }) {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
const [type, setType] = useState("Expense");

  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");




const [editingId, setEditingId] = useState(null);
  // FETCH EXPENSES
  const fetchExpenses = async () => {

    try {

      const response = await API.get("/expenses");

      setExpenses(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  // LOAD DATA WHEN PAGE OPENS
  useEffect(() => {

    fetchExpenses();

  }, []);

  // ADD EXPENSE
const addExpense = async () => {

  try {

    const expenseData = {
      title,
      amount,
      category,
      type,
    };

    if (editingId) {

      await API.put(
        `/expenses/${editingId}`,
        expenseData
      );

      setEditingId(null);

    } else {

      await API.post(
        "/expenses",
        expenseData
      );

    }

    fetchExpenses();

    setTitle("");
    setAmount("");
    setCategory("");
setType("Expense");

  } catch (error) {

    console.log(error);

  }

};
  const deleteExpense = async (id) => {

  try {

    await API.delete(`/expenses/${id}`);

    fetchExpenses();

  } catch (error) {

    console.log(error);

  }

};
const editExpense = (expense) => {

  setTitle(expense.title);

  setAmount(expense.amount);
  setCategory(expense.category);
  setEditingId(expense._id);

};
const filteredExpenses = expenses.filter((expense) =>
  expense.title.toLowerCase().includes(search.toLowerCase())
);

  return (

  <div className={`app ${darkMode ? "dark" : ""}`}>

    {/* HEADER */}

    <div className="header">

      <h1>Expense Manager</h1>

      <button
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

    </div>

    {/* FORM */}

    <div className="controls">

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) =>
          setAmount(e.target.value)
        }
      />
      <select
      className="nobita"
  value={category}
  onChange={(e) =>
    setCategory(e.target.value)
  }
>

  <option value="">
    Select Category
  </option>

  <option value="Food">
    Food
  </option>

  <option value="Shopping">
    Shopping
  </option>

  <option value="Travel">
    Travel
  </option>

  <option value="Salary">
    Salary
  </option>

  <option value="Bills">
    Bills
  </option>

</select>

<select
className="nobita"
  value={type}
  onChange={(e) =>
    setType(e.target.value)
  }
>

  <option value="Expense">
    Expense
  </option>

  <option value="Income">
    Income
  </option>

</select>

      <button onClick={addExpense}>

        {editingId ? "Update" : "Add"}

      </button>

    </div>

    {/* SEARCH */}

    <input
      type="text"
      className="search"
      placeholder="Search expenses..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />

    {/* TRANSACTIONS */}

    <div className="transactions">

  {filteredExpenses.length === 0 && (

    <div className="empty">

      <h2>No expenses yet</h2>

      <p>
        Add your first transaction
      </p>

    </div>

  )}

      {filteredExpenses.map((expense) => (

        <div
          key={expense._id}
          className="expense-card"
        >

          <div>

            <h3>{expense.title}</h3>

            <p>₹{expense.amount}</p>

<span>
  {expense.category} • {expense.type}
</span>

          </div>

          <div className="buttons">

            <button
              onClick={() =>
                editExpense(expense)
              }
            >
              Edit
            </button>

            <button
              onClick={() =>
                deleteExpense(expense._id)
              }
            >
              Delete
            </button>

          </div>

        </div>

      ))}

    </div>

  </div>

);

}

export default Expenses;