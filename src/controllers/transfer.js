import Cookies from "js-cookie";
import axios from "axios";

const transfer = async (receiver, amount, description) => {
  const token = Cookies.get("_peer__pay");

  console.log(receiver, amount, description, token)
  const response = await axios.post(
    "http://localhost:4000/clientTransfer",
    {
      receiver,
      amount,
      description,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export default transfer;
