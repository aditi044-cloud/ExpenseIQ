require("dotenv").config();
const auth = require("./middleware/auth");
const Expense = require("./models/Expense");
const Budget = require("./models/Budget");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

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



const authRoutes =
require("./routes/authRoutes");


app.use(
"/auth",
authRoutes
);




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

app.get("/expenses", auth, async (req, res) => {
  try {

    const expenses =
await Expense.find({
userId:req.user.id
});

    res.send(expenses);

  } catch (error) {

    res.status(500).send({
      message: "Error fetching expenses",
      error: error.message
    });

  }

});



// ADD NEW EXPENSE
app.post("/expenses", auth, async (req, res) => {

  try {


    const newExpense = new Expense({

      title:req.body.title,

      amount:req.body.amount,

      category:req.body.category,

      type:req.body.type,

      date:req.body.date,

      userId:req.user.id

    });


    const savedExpense =
    await newExpense.save();

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
app.put("/expenses/:id", auth, async (req, res) => {

  try {

    

  const updatedExpense =
await Expense.findOneAndUpdate(

{
_id:req.params.id,
userId:req.user.id
},

req.body,

{
new:true
}

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
app.delete("/expenses/:id", auth, async (req,res)=>{

  try {

  const deletedExpense =
await Expense.findOneAndDelete({

_id:req.params.id,

userId:req.user.id

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

// PROFILE DATA
app.get("/profile", auth, async (req, res) => {

  try {


    const income = await Expense.aggregate([

      {
        $match:{
type:"Income",
userId:req.user.id
}
      },

      {
        $group: {

          _id: null,

          total: {
            $sum: "$amount"
          }

        }
      }

    ]);




    const expense = await Expense.aggregate([

      {
        $match:{
type:"Expense",
userId:req.user.id
}
      },


      {
        $group: {

          _id: null,

          total: {
            $sum: "$amount"
          }

        }
      }

    ]);




    const transactions = await Expense.countDocuments({userId:req.user.id});



    res.send({

      income: income[0]?.total || 0,

      expense: expense[0]?.total || 0,


      savings:
        (income[0]?.total || 0)
        -
        (expense[0]?.total || 0),


      transactions

    });



  } catch(error){


    res.status(500).send({

      message:"Error fetching profile data",

      error:error.message

    });


  }


});

// GET BUDGET
app.get("/budget", auth, async(req,res)=>{

  try{

    const budget = await Budget.findOne({
    userId: req.user.id
});

    res.send(budget);

  }

  catch(error){

    res.status(500).send(error);

  }

});



// SAVE BUDGET
app.post("/budget", auth, async(req,res)=>{

  try{

    const budget =
    await Budget.findOneAndUpdate(

      { userId:req.user.id},

      req.body,

      {
        upsert:true,
        new:true
      }

    );

    res.send(budget);

  }

  catch(error){

    res.status(500).send(error);

  }

});

// START SERVER
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});