import "../styles/Expenses.css";
import { useEffect, useState } from "react";
import API from "../services/api";

function Expenses({ darkMode, setDarkMode }) {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
const [type, setType] = useState("");
const [date, setDate] = useState("");

  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
const [filterType,setFilterType] = useState("All");
const [filterCategory,setFilterCategory] = useState("All");



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
  date,
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
    setDate("");

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
  setType(expense.type);
  setEditingId(expense._id);

};
const filteredExpenses = expenses.filter((expense)=>{

 const searchMatch =
 expense.title
 .toLowerCase()
 .includes(search.toLowerCase());


 const typeMatch =
 filterType==="All" ||
 expense.type===filterType;


 const categoryMatch =
 filterCategory==="All" ||
 expense.category===filterCategory;


 return searchMatch && typeMatch && categoryMatch;

});
  return (

  <div className={`app ${darkMode ? "dark" : ""}`}>

    {/* HEADER */}

   <div className="header">
  <h1>Expense Manager</h1>
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
      <input
  type="date"
  value={date}
  onChange={(e)=>
    setDate(e.target.value)
  }
/>
      <select
className={category ? "nobita active" : "nobita"}
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
className={type ? "nobita active" : "nobita"}
value={type}
onChange={(e)=>
setType(e.target.value)
}
>

<option value="">
  Select Type
</option>

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
{/* FILTERS */}

<div className="filters">

<select
value={filterType}
onChange={(e)=>setFilterType(e.target.value)}
>

<option value="All">
All Types
</option>

<option value="Expense">
Expense
</option>

<option value="Income">
Income
</option>

</select>



<select
value={filterCategory}
onChange={(e)=>setFilterCategory(e.target.value)}
>

<option value="All">
All Categories
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


</div>
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

<p className="date">
{
 expense.date 
 ? new Date(expense.date).toLocaleDateString()
 : ""
}
</p>

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