const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  id: {
    type: String,
    required: true,
    index: { unique: true },
  },
  type: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: Object,
  },
});

module.exports = Transaction = mongoose.model("Transaction", TransactionSchema);
