import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../../store/atoms";

import { SERVER_URL } from "../../../../.moon.config.mjs";
import DashboardOptions from "./DashboardOptions";

async function getUserDetails() {
  const token = localStorage.getItem("token");
  if (!token) {
    return { hasError: true };
  }
  try {
    const response = await axios.get(`${SERVER_URL}/user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const [lastName, firstName] = response.data.name.split("-");
    return { balance: response.data.balance, firstName, lastName };
  } catch (error) {
    console.error("Unauthorized");
    return { hasError: true };
  }
}

function Dashboard() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  console.log(useRecoilValue(loginState));
  useEffect(() => {
    async function onMount() {
      const data = await getUserDetails();
      if (data.hasError) {
        navigate("/login");
      }
      setUserDetails(data);
    }
    onMount();
  }, []);

  if (!userDetails.firstName) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="p-3">
      <h1 className="text-2xl">
        Welcome,{" "}
        <span className="font-semibold">
          {userDetails.firstName} {userDetails.lastName}
        </span>
      </h1>
      <h2 className="text-xl font-medium">Balance: Rs {userDetails.balance}</h2>
      <DashboardOptions />
    </div>
  );
}

export default Dashboard;