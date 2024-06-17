import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

import HomeContainer from "./components/HomeContainer";
import LandingPage from "./components/LandingPage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import SendPage from "./components/SendPage";

const queryClient = new QueryClient({
  staleTime: Infinity,
});

function App() {
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <Routes>
              <Route path="/" element={<HomeContainer />}>
                <Route index element={<LandingPage />} />
                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="send" element={<SendPage />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
              </Route>
            </Routes>
          </RecoilRoot>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
