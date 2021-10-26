require("dotenv").config();
const User = require("../../models/User.model");
const express = require("express");
const router = express.Router();

const authenticateToken = require("../../middlewares/authenticate");
const setTransactionHistory = require("../../controllers/history");

router.post("/", authenticateToken, async (req, res) => {
  const { amount, receiver } = req.body;
  const { peerId } = req.user;
  
  const data = {
    amount,
    receiver,
    peerId,
  };
  // console.log(peerId, data)

  if (parseInt(amount) < 0)
    return res.json({
      error: true,
      message: `Balance is lower than ${amount}`,
    });
  if (peerId.toLowerCase() === receiver.toLowerCase())
    return res.json({
      error: true,
      message: "Cannot transfer money to yourself",
    });

  const sender = await User.findOne({ peerId });
  if (!sender) return res.json({ error: true });

  const recipient = await User.findOne({
    peerId: receiver.toLowerCase(),
  });

  if (!recipient) {
    return res.json({
      error: true,
      message: `${receiver} doesn't exist`,
    });
  }

  if (parseInt(sender.balance) < parseInt(amount)) {
    return res.json({
      error: true,
      message: `Balance is lower than ${amount}`,
    });
  }

  const makePayment = await User.updateOne(
    { peerId },
    {
      $set: {
        balance: parseInt(sender.balance) - parseInt(amount),
      },
    }
  );

  if (makePayment) {
    setTransactionHistory(
      amount,
      receiver,
      peerId,
      {
        initialBalance: parseInt(sender.balance),
        newBalance: parseInt(sender.balance) - parseInt(amount),
      },
      false,
      "Peer Transfer",
    );
  } 
  // else {
  //   setTransactionHistory(
  //     amount,
  //     receiver,
  //     peerId,
  //     {},
  //     "Transfer Fund",
  //     "failed"
  //   );
  // }

  const payReceiver = await User.updateOne(
    { peerId: receiver.toLowerCase() },
    {
      $set: {
        balance: parseInt(recipient.balance) + parseInt(req.body.amount),
      },
    }
  );

  if (payReceiver) {
    setTransactionHistory(
      amount,
      peerId[0].toUpperCase() + peerId.slice(1),
      receiver.toLowerCase(),
      {
        initialBalance: recipient.balance,
        newBalance: parseInt(recipient.balance) + parseInt(amount),
      },
      true,
      "Peer Recieve",
    );
    return res.json({ error: false });
  } 
  // else {
  //   setTransactionHistory(
  //     amount,
  //     receiver,
  //     peerId,
  //     {},
  //     "Transfer Fund",
  //     "failed"
  //   );
  //   return res.json({
  //     error: true,
  //     message: `Error  sending the money`,
  //   });
  // }
});

module.exports = router;
