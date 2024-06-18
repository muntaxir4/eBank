import { useRecoilState } from "recoil";
import { loginState } from "../store/atoms";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import pic1 from "../assets/pic1.png";
import pic2 from "../assets/pic2.png";

function LandingPage() {
  const [isLoggedIn, setLoggedIn] = useRecoilState(loginState);
  function handleLogout() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    window.location.reload();
  }
  const navigate = useNavigate();
  return (
    <div className="flex flex-col m-2">
      <p className="text-center mb-8 text-2xl">
        Send and Receive eRuppee with ease.
      </p>
      {isLoggedIn && (
        <div className="flex justify-center gap-3">
          <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
          <Button variant="outline" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      )}
      {!isLoggedIn && (
        <div className="flex justify-center gap-3">
          <Button onClick={() => navigate("/signup")}>Sign Up</Button>
          <Button variant="secondary" onClick={() => navigate("/login")}>
            Log in
          </Button>
        </div>
      )}
      <Carousel className="w-full max-w-xl self-center m-2 p-1 overflow-hidden">
        <CarouselContent>
          <CarouselItem>
            <img src={pic1} alt="pic1" />
          </CarouselItem>
          <CarouselItem>
            <img src={pic2} alt="pic2" />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default LandingPage;
