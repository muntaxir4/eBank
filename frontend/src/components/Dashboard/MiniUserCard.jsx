import { useNavigate } from "react-router-dom";
import userImg from "../../assets/user.png";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

function MiniUserCard({ firstName, lastName, _id }) {
  const navigate = useNavigate();

  function handleSendPage() {
    navigate(`/send?name=${firstName}+${lastName}`, { state: { to: _id } });
  }

  return (
    <div className="border  shadow-sm rounded  flex justify-between m-3">
      <div className="flex m-2 gap-2">
        <Avatar>
          <AvatarFallback>
            {firstName[0]}
            {lastName[0]}
          </AvatarFallback>
        </Avatar>
        {/* <img src={userImg} alt="default pic" className="h-8 self-center" /> */}
        <h3 className="self-center ml-2">
          {firstName} {lastName}
        </h3>
      </div>
      <Button
        variant="secondary"
        className="self-center m-1 h-[70%] px-2"
        onClick={handleSendPage}
      >
        Send
      </Button>
    </div>
  );
}

export default MiniUserCard;
