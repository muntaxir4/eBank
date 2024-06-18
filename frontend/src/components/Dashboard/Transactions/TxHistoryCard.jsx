import { Card, CardContent } from "@/components/ui/card";

function TxHistoryCard({ data, option }) {
  return (
    <div className="flex flex-col-reverse">
      {data && data.length ? (
        data.map((transaction, index) => (
          <Card key={index} className="m-2 p-2 ">
            <CardContent className="p-2 md:flex md:gap-2 md:justify-between">
              <p>Amount: Rs {transaction.amount}</p>
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
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No transactions</p>
      )}
    </div>
  );
}

export default TxHistoryCard;
