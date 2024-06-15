import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Authenticate from "../../Authenticate.js";
import { loginState } from "../../store/atoms";

import "./auth.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setLoginState = useSetRecoilState(loginState);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await Authenticate({ formEvent: e, type: "signup" });
    if (data.error) {
      setError(data.error);
      return;
    }
    localStorage.setItem("token", data.token);
    setLoginState(true);
    setTimeout(() => navigate("/dashboard"), 1000);
  }

  return (
    <>
      <div className="flex h-full justify-center">
        <div className="min-h-64 w-5/6 self-center rounded-md border-2 border-black bg-white shadow-lg sm:w-1/3">
          <form className="m-4 flex flex-col justify-around gap-3">
            <div>
              <label htmlFor="username" className="text-sm">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="w-full rounded-md border border-black bg-slate-100 p-1 px-2 text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm">
                E-mail
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="w-full rounded-md border border-black bg-slate-100 p-1 px-2 text-sm"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <input
                type="text"
                name="password"
                id="password"
                className="w-full rounded-md border border-black bg-slate-100 p-1 px-2 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="effect01 mt-5 w-full rounded-md border-2 border-black bg-green-400 p-1 text-lg font-bold"
            >
              <span>Sign Up</span>
            </button>
          </form>
        </div>
      </div>
      {error && <div className="text-center text-red-500">{error}</div>}
      <footer className="text-center">Component created by @muntaxir4</footer>
    </>
  );
}

export default Signup;
