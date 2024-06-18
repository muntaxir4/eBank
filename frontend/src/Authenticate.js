import axios from "axios";
import { SERVER_URL } from ".././.moon.config.js";

async function Authenticate({ formEvent, type }) {
  const body = new URLSearchParams();
  body.append("email", formEvent.target.email.value);
  body.append("password", formEvent.target.password.value);
  if (type === "signup") {
    body.append("firstName", formEvent.target.firstName.value);
    body.append("lastName", formEvent.target.lastName.value);
  }
  try {
    const response = await axios.post(`${SERVER_URL}/auth/${type}`, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error", error);
    return { error: "Invalid Credentials" };
  }
}

export default Authenticate;
