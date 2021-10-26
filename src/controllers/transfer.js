import Cookies from "js-cookie";
import axios from "axios";

const transfer = async (receiver, amount, description) => {
  const token = Cookies.get("_peer__pay");

  console.log(receiver, amount, description, token)
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_URI}/clientTransfer`,
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
