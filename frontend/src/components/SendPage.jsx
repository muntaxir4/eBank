import { useState, useEffect } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

import sendMoney from "../sendMoney";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

function SendPage() {
  const [amount, setAmount] = useState("");
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const toName = searchParams.get("name");
  const navigate = useNavigate();

  //   Redirect to Home if correct no name and location is found i.e. user is trying to access route directly
  useEffect(() => {
    if (!toName || !location.state) {
      navigate("/");
    }
  }, []);

  const { balance, to } = location?.state ?? { balance: 10000 };
  const { toast } = useToast();

  async function handleSend(e) {
    e.preventDefault();
    const result = await sendMoney(to, amount);
    if (result.error) {
      console.log(result.error);
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Insuficient Balance",
      });
    }
    toast({
      description: `${amount} sent to ${toName} successfully. Redirecting you to Dashboard`,
    });
    setTimeout(() => navigate("/dashboard"), 1500);
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-5/6 self-center rounded-md border-2 border-black bg-white shadow-lg sm:w-1/3">
          <form
            className="m-4 flex flex-col justify-around gap-3"
            onSubmit={handleSend}
          >
            <Avatar className="self-center h-16 w-16 ">
              <AvatarFallback className="text-3xl">
                {toName[0]}
                {toName[toName.indexOf(" ") + 1]}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <label htmlFor="password" className="mb-7 font-semibold text-xl">
                {toName ?? "Anonymous"}
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                className="w-full mt-4 rounded-md border border-black bg-slate-100 p-1 px-2 text-sm"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Type amount here"
              />
            </div>

            <button
              type="submit"
              className="effect01 mt-5 w-full rounded-md border-2 border-black bg-cyan-600 p-1 text-lg font-bold"
              disabled={balance < amount}
            >
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
      <footer className="text-center">Component created by @muntaxir4</footer>
    </>
  );
}

export default SendPage;
