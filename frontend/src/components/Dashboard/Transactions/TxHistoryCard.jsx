import { Card, CardContent } from "@/components/ui/card";

function TxHistoryCard({ data, option }) {
  return (
    <div className="flex flex-col-reverse">
      {data && data.length ? (
        data.map((transaction, index) => (
          <Card key={index} className="m-2 p-2 ">
            <CardContent className="p-2 md:grid lg:grid-cols-4 md:grid-cols-5">
              <p>
                Amount:
                <span className="font-medium"> Rs {transaction.amount}</span>
              </p>
              {/* option 0 for sent and 1 for received. Also shrink username in large screen */}
              {option ? (
                <>
                  <p className="md:hidden ">
                    From:{" "}
                    <span className="font-medium">{transaction.from}</span>
                  </p>
                  <p className="hidden md:block">
                    From:{" "}
                    <span className="font-medium">
                      {transaction.from.substr(0, 10)}
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <p className="md:hidden ">
                    From: <span className="font-medium">{transaction.to}</span>
                  </p>
                  <p className="hidden md:block">
                    To:{" "}
                    <span className="font-medium">
                      {transaction.to.substr(0, 10)}
                    </span>
                  </p>
                </>
              )}
              <p className="md:col-span-2 lg:col-span-1">
                Txid: <span className="font-medium">{transaction.txid}</span>
              </p>
              <p className="text-end">
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
