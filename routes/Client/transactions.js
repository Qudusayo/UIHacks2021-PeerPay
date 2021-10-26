require("dotenv").config();
const express = require("express");
const router = express.Router();

const authenticateToken = require("../../middlewares/authenticate");
const Transaction = require("../../models/Transaction.model");
const User = require("../../models/User.model");

router.get("/", authenticateToken, async (req, res) => {
  const peerId = req.user.peerId;

  const userBalance = await User.findOne({ peerId });
  const transactions = await Transaction.find({ from: peerId });
  // console.log(transactions);
  // console.log(userBalance.balance);
  return res.json({transactions, balance: userBalance.balance});
});

router.post("/", authenticateToken, async (req, res) => {
  const id = req.body.id;

  const transaction = await Transaction.find({ id });
  // console.log(transaction);
  res.json(transaction[0]);
});

module.exports = router;
