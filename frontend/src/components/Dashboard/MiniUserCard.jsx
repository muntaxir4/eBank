import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

function MiniUserCard({ firstName, lastName, id }) {
  const navigate = useNavigate();

  function handleSendPage() {
    navigate(`/send?name=${firstName}+${lastName}`, { state: { to: id } });
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
      </Button>{" "}
    </div>
  );
}

export default MiniUserCard;
