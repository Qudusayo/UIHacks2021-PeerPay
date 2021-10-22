const express = require("express");
const router = express.Router();

const User = require("../../models/User.model");

// const mail = require("../middleware/mailer");

router.post("/", async (req, res) => {
  let { firstName, lastName, email, phoneNumber, peerId, password } = req.body;

  peerId ? (peerId = peerId.toLowerCase()) : null;
  email ? (email = email.toLowerCase()) : null;

  const newUser = new User({
    name: `${firstName} ${lastName}`,
    email,
    phoneNumber,
    peerId,
    password,
    balance: 0,
    verified: false,
  });

  const checkEmail = await User.find({ email });
  if (!!checkEmail.length) {
    return res.status(409).json({
      errorMsg: "Email already exist",
      error: true,
    });
  }

  const checkPeerId = await User.find({ peerId });
  if (!!checkPeerId.length) {
    return res.status(409).json({
      errorMsg: "Peer-Id already exist",
      error: true,
    });
  }

  const checkPhoneNumber = await User.find({ phoneNumber });
  if (!!checkPhoneNumber.length) {
    return res.status(409).json({
      errorMsg: "Phone Number already exist",
      error: true,
    });
  }

  newUser.save(function (err) {
    if (err)
      return res.json({
        errorMsg: "Error registering user",
        message: err,
        error: true,
      });
    // mail("welcome", email, { firstName });
    return res.status(200).json({
      errorMsg: "Registration Successful, kindly verify your account",
      error: false,
    });
  });
});

module.exports = router;
