import { Outlet } from "react-router-dom";

function HomeContainer() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="m-2">
        <h1 className="text-4xl font-bold text-center">eBank</h1>
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
