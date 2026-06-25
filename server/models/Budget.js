const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({

  amount:{
    type:Number,
    required:true
  }

});

module.exports = mongoose.model(
  "Budget",
  budgetSchema
);