const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  email:{
    type:String,
    required:true,
    unique:true
  },

  password:{
    type:String,
    required:true
  },

  // NEW FIELD
  currency:{
    type:String,
    default:"INR"
  },

  // NEW FIELD
  monthlyIncome:{
    type:Number,
    default:0
  },

  // NEW FIELD
  savingGoal:{
    type:Number,
    default:0
  }

});

module.exports = mongoose.model(
  "User",
  userSchema
);