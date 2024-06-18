import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Authenticate from "../../Authenticate.js";
import { loginState } from "../../store/atoms";

import { useToast } from "@/components/ui/use-toast";

import "./auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const navigate = useNavigate();
  const { toast } = useToast();

  //Redirect to dashboard if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await Authenticate({ formEvent: e, type: "login" });
    if (data.error) {
      if (data.error.name == "ZodError") {
        return toast({
          variant: "destructive",
          description: "Invalid Credentials",
        });
      }
      return toast({
        variant: "destructive",
        description: JSON.stringify(data.error),
      });
    }
    localStorage.setItem("token", data.token);
    setIsLoggedIn(true);
    toast({
      description: "Logged in successfully. Redirecting you to Dashboard",
    });
    setTimeout(() => navigate("/dashboard"), 1000);
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-5/6 self-center rounded-md border-2 border-black bg-white shadow-lg sm:w-1/3">
          <form
            className="m-4 flex flex-col justify-around gap-3"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="email" className="text-sm">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full rounded-md border border-black bg-slate-100 p-1 px-2 text-sm"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full rounded-md border border-black bg-slate-100 p-1 px-2 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="effect01 mt-5 w-full rounded-md border-2 border-black bg-slate-400 p-1 text-lg font-bold "
            >
              <span>Log In</span>
            </button>
          </form>
        </div>
      </div>
      <footer className="text-center">Component created by @muntaxir4</footer>
    </>
  );
}

export default Login;
