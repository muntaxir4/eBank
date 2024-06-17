import { useState } from "react";

import SearchBox from "./SearchBox";
import TransactionHistory from "./Transactions/TransactionsHistory";

function DashboardOptions() {
  const [option, setOption] = useState(0);
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 ">
        <button
          type="button"
          onClick={() => setOption(0)}
          className={!option ? "bg-slate-200 border border-black" : ""}
        >
          Find Others
        </button>
        <button
          type="button"
          onClick={() => setOption(1)}
          className={option ? "bg-slate-200 border border-black" : ""}
        >
          My Transactions
        </button>
      </div>
      {!option ? <SearchBox /> : <TransactionHistory />}
    </div>
  );
}

export default DashboardOptions;
