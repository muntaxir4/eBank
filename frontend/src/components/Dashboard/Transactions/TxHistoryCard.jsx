function TxHistoryCard({ data, option }) {
  return (
    <div>
      {data && data.length ? (
        data.map((transaction, index) => (
          <div
            key={index}
            className="flex flex-col border border-black p-2 m-2"
          >
            <p>Amount: {transaction.amount}</p>
            {option ? (
              <p>From: {transaction.from}</p>
            ) : (
              <p>To: {transaction.to}</p>
            )}
            <p>Txid: {transaction.txid}</p>
            <p>
              Time:{" "}
              {new Date(transaction.date).toLocaleDateString("en-IN", {
                year: "numeric", // "2021"
                month: "numeric", // "July"
                day: "numeric", // "19"
                hour: "numeric", // "11"
                minute: "numeric", // "30"
                second: "numeric", // "30"
              })}
            </p>
          </div>
        ))
      ) : (
        <p>No transactions</p>
      )}
    </div>
  );
}

export default TxHistoryCard;
