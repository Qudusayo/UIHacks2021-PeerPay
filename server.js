require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const server = express();

//Middleware
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongoose Coonected"))
  .catch((err) => console.log(err));

// Routes
const signup = require("./routes/Client/signup");
const signin = require("./routes/Client/signin");
const getClientData = require("./routes/Client/getClientData");
const clientTransfer = require("./routes/Client/transfer");
const clientTransaction = require("./routes/Client/transactions");

// Get Routes
server.use("/auth/signup", signup);
server.use("/auth/signin", signin);
server.use("/getClientData", getClientData);
server.use("/clientTransfer", clientTransfer);
server.use("/clientTransaction", clientTransaction);

server.get("/", (req, res) => {
  res.status(403).json("Access Denied");
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));