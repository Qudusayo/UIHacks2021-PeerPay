require("dotenv").config();
const express = require("express");
const router = express.Router();

const authenticateToken = require("../../middlewares/authenticate");
const Transaction = require("../../models/Transaction.model");

router.get("/", authenticateToken, async (req, res) => {
  const peerId = req.user.peerId;

  const transactions = await Transaction.find({ from: peerId });
  console.log(transactions);
  return res.json(transactions);
});

router.post("/", authenticateToken, async (req, res) => {
  const id = req.body.id;

  const transaction = await Transaction.find({ id });
  // console.log(transaction);
  res.json(transaction[0]);
});

module.exports = router;
