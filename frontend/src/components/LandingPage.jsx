import { useRecoilState } from "recoil";
import { loginState } from "../store/atoms";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [isLoggedIn, setLoggedIn] = useRecoilState(loginState);
  console.log("logged", isLoggedIn);
  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    window.location.reload();
  }
  const navigate = useNavigate();
  return (
    <div>
      <p className="text-center ">
        This is an implementation of digital banking
      </p>
      {isLoggedIn && (
        <div className="flex justify-center gap-3">
          <button
            type="button"
            className="border border-black rounded-md p-1 hover:bg-slate-200"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button
            type="button"
            className="border border-black rounded-md p-1 hover:bg-slate-200"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      )}
      {!isLoggedIn && (
        <div className="flex justify-center gap-3">
          <button
            type="button"
            className="border border-black rounded-md p-1 hover:bg-slate-200"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
          <button
            type="button"
            className="border border-black rounded-md p-1 hover:bg-slate-200"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
