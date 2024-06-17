function TxHistoryCard({ data, option }) {
  return (
    <div>
      {data ? (
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
          </div>
        ))
      ) : (
        <p>No transactions</p>
      )}
    </div>
  );
}

export default TxHistoryCard;
