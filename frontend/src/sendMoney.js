import { SERVER_URL } from ".././.moon.config.js";
import axios from "axios";

async function sendMoney(to, amount) {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${SERVER_URL}/user/transfer`, null, {
      params: {
        to,
        amount,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return { error };
  }
}

export default sendMoney;
