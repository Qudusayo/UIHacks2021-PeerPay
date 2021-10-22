const express = require("express");
const router = express.Router();

const authenticateToken = require("../../middlewares/authenticate");
const User = require("../../models/User.model");

router.get("/profile", authenticateToken, async (req, res) => {
  const findUser = await User.findOne({ peerId: req.user.peerId });

  if (findUser) {
    return res.status(200).json({
      name: findUser.name,
      email: findUser.email,
      peerId: req.user.peerId,
      phoneNumber: findUser.phoneNumber,
      balance: findUser.balance,
      verified: findUser.verified
    });
  } else {
    return res.status(404).json({
      denied: true,
      errorMsg: "Invalid login details",
      userName: req.user.userName,
    });
  }

});

router.get("/balance", authenticateToken, async (req, res) => {
  const findUser = await User.findOne({ peerId: req.user.peerId });

  if (findUser) {
    return res.status(200).json({
      balance: findUser.balance,
      peerId: req.user.peerId,
    });
  } else {
    return res.status(404).json({
      denied: true,
      errorMsg: "Invalid user",
    });
  }
});

module.exports = router;
