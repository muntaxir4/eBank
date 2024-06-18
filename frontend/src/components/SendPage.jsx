import { useState, useEffect } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

import sendMoney from "../sendMoney";
import userImg from "../assets/user.png";

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

  const [success, setSuccess] = useState({});

  async function handleSend(e) {
    e.preventDefault();
    const result = await sendMoney(to, amount);
    if (result.error) {
      console.log(result.error);
      return setSuccess({ error: "Failed to send money" });
    }
    setSuccess({
      message: `${amount} sent to ${toName} successfully. Redirecting you to Dashboard`,
    });
    setTimeout(() => navigate("/dashboard"), 1000);
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-5/6 self-center rounded-md border-2 border-black bg-white shadow-lg sm:w-1/3">
          <form
            className="m-4 flex flex-col justify-around gap-3"
            onSubmit={handleSend}
          >
            <img src={userImg} alt="" className="self-center w-2/6" />
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
              className="effect01 mt-5 w-full rounded-md border-2 border-black bg-lime-800 p-1 text-lg font-bold"
              disabled={balance < amount}
            >
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
      {success.message && (
        <p className="text-green-400 text-center">{success.message}</p>
      )}
      {success.error && (
        <p className="text-red-400 text-center">{success.error}</p>
      )}
      <footer className="text-center">Component created by @muntaxir4</footer>
    </>
  );
}

export default SendPage;
