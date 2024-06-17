import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Authenticate from "../../Authenticate.js";
import { loginState } from "../../store/atoms";

import "./auth.css";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

  const navigate = useNavigate();

  //Redirect to dashboard if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await Authenticate({ formEvent: e, type: "signup" });
    if (data.error) {
      setError(data.error);
      return;
    }
    localStorage.setItem("token", data.token);
    setIsLoggedIn(true);
    setTimeout(() => navigate("/dashboard"), 1000);
  }

  return (
    <>
      <div className="flex h-full justify-center">
        <div className="min-h-64 w-5/6 self-center rounded-md border-2 border-black bg-white shadow-lg sm:w-1/3">
          <form
            className="m-4 flex flex-col justify-around gap-3"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="firstName" className="text-sm">
                firstName
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="w-full rounded-md border border-black bg-slate-100 p-1 px-2 text-sm"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="text-sm">
                lastName
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="w-full rounded-md border border-black bg-slate-100 p-1 px-2 text-sm"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
