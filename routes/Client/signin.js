const express = require("express");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

const User = require("../../models/User.model");

router.post("/", async (req, res) => {
  let { phoneNumber, password } = req.body;

  const userWithPhoneNumber = await User.findOne({ phoneNumber });
  if (!userWithPhoneNumber) {
    return res.status(404).json({
      data: { phoneNumber, password },
      errorMsg: "User not registered",
      authenticated: false,
    });
  }

  userWithPhoneNumber.comparePassword(password, async (err, verified) => {
    if (verified) {
      let data = {
        peerId: userWithPhoneNumber.peerId,
        password,
        verified: userWithPhoneNumber.verified,
      };
      let authToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
      res.setHeader("Set-Cookie", authToken);
      res
        .cookie("authToken", authToken, {
          maxAge: 60 * 60 * 1000, // 1 hour
          httpOnly: true,
          secure: true,
          sameSite: true,
        })
        .json({ authToken, authenticated: verified });
    } else {
      res.status(200).json({
        data: { phoneNumber, password },
        errorMsg: "Invalid user password",
        authenticated: verified,
      });
    }
  });
});

module.exports = router;
