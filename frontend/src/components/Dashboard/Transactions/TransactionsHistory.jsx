import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import TxHistoryCard from "./TxHistoryCard";
import { SERVER_URL } from "../../../.././.moon.config.js";

async function getTransactions() {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${SERVER_URL}/user/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

function TransactionHistory() {
  const [option, setOption] = useState(0);
  const { data, isPending, error } = useQuery({
    queryKey: [],
    queryFn: () => getTransactions(),
  });

  if (isPending) return <p>Loading...</p>;
  else if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col m-2">
      <div className="grid grid-cols-2 ">
        <button
          type="button"
          onClick={() => setOption(0)}
          className={!option ? "border-b border-black" : ""}
        >
          Sent
        </button>
        <button
          type="button"
          onClick={() => setOption(1)}
          className={option ? "border-b border-black" : ""}
        >
          Received
        </button>
      </div>
      <TxHistoryCard
        data={option ? data.received : data.sent}
        option={option}
      />
    </div>
  );
}

export default TransactionHistory;
