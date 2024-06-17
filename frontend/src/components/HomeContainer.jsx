import { Link, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { loginState } from "../store/atoms";

function HomeContainer() {
  const [isLoggedIn, setLoggedIn] = useRecoilState(loginState);
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    window.location.reload();
  }
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="m-2 flex  justify-around">
        <Link to={"/"} className="text-4xl font-bold">
          eBank
        </Link>

        {isLoggedIn && window.location.pathname !== "/" && (
          <div className="flex gap-2 ">
            <button
              type="button"
              className="border border-black rounded-md p-1 hover:bg-slate-200"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              type="button"
              className="border border-black rounded-md p-1 hover:bg-slate-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="h-5/6">
        <Outlet />
      </div>
      <footer className="text-center">
        Made with ❤️ by{" "}
        <a
          href="https://www.github.com/muntaxir4"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          @muntaxir4
        </a>
      </footer>
    </div>
  );
}

export default HomeContainer;
