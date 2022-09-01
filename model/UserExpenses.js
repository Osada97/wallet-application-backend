const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userExpensesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  amount_spent: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("UserExpense", userExpensesSchema);
