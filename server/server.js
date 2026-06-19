const authMiddleware =
require("./middleware/authMiddleware");
require("dotenv").config();
const Expense = require("./models/Expense");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes =
require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use(authMiddleware);
// DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Database connected");
})
.catch((error) => {
  console.log(error);
});


// SCHEMA
// const expenseSchema = new mongoose.Schema({

//   title: {
//     type: String,
//     required: true
//   },

//   amount: {
//     type: Number,
//     required: true
//   }

// });


// MODEL




// MIDDLEWARE
app.use((req, res, next) => {

  console.log("New request received");

  next();

});



// HOME ROUTE
app.get("/", (req, res) => {

  console.log("Hello from backend");

  res.send("Hello from frontend response");

});



// GET ALL EXPENSES
app.get(
  "/expenses",
  authMiddleware,
  async (req, res) => {

  try {

    const expenses = await Expense.find({ userId: req.user.id });

    res.send(expenses);

  } catch (error) {

    res.status(500).send({
      message: "Error fetching expenses",
      error: error.message
    });

  }

});



// ADD NEW EXPENSE
app.post("/expenses", authMiddleware, async (req, res) => {

  try {

    const newExpense = new Expense({
      ...req.body,
      userId: req.user.id
    });

    const savedExpense = await newExpense.save();

    res.status(201).send({
      message: "Expense saved to database",
      expense: savedExpense
    });

  } catch (error) {

    res.status(500).send({
      message: "Error saving expense",
      error: error.message
    });

  }

});



// UPDATE EXPENSE
app.put("/expenses/:id", authMiddleware, async (req, res) => {

  try {

    const expenseId = req.params.id;

    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      req.body,
      { new: true }
    );

    if (!updatedExpense) {

      return res.status(404).send({
        message: "Expense not found"
      });

    }

    res.send({
      message: "Expense updated successfully",
      expense: updatedExpense
    });

  } catch (error) {

    res.status(500).send({
      message: "Error updating expense",
      error: error.message
    });

  }

});



// DELETE EXPENSE
app.delete("/expenses/:id", authMiddleware, async (req, res) => {

  try {

    const deletedExpense =
await Expense.findOneAndDelete({
  _id: req.params.id,
  userId: req.user.id,
});

    if (!deletedExpense) {

      return res.status(404).send({
        message: "Expense not found"
      });

    }

    res.send({
      message: "Expense deleted successfully",
      deletedExpense: deletedExpense
    });

  } catch (error) {

    res.status(500).send({
      message: "Error deleting expense",
      error: error.message
    });

  }

});



// START SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});