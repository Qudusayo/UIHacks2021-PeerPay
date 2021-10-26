const moment = require("moment");
const { customAlphabet } = require("nanoid");

const Transaction = require("../models/Transaction.model");

const alphabet =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 30);

module.exports = function setTransactionHistory(
  amount,
  reciever,
  sender,
  info,
  status,
  type,
  id = nanoid()
) {
  const newTransaction = new Transaction({
    id,
    amount,
    type,
    from: sender,
    to: reciever,
    date: moment().utcOffset(1).format("lll"),
    positive: status,
    additionalInfo: info,
  });

  newTransaction
    .save()
    .then((res) => {
      // console.log(res);
      return { error: false };
    })
    .catch((err) => {
      // console.log(err);
      return { error: true };
    });
};
