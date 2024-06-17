import { useNavigate } from "react-router-dom";
import userImg from "../../assets/user.png";

function MiniUserCard({ firstName, lastName, _id }) {
  const navigate = useNavigate();

  function handleSendPage() {
    navigate(`/send?name=${firstName}+${lastName}`, { state: { to: _id } });
  }

  return (
    <div className="border border-black rounded  flex justify-between m-2">
      <div className="flex m-2 gap-2">
        <img src={userImg} alt="default pic" className="h-8 self-center" />
        <h3 className="self-center">
          {firstName} {lastName}
        </h3>
      </div>
      <button
        type="button"
        className="border border-black rounded-md hover:bg-slate-200 m-2 p-1 self-center"
        onClick={handleSendPage}
      >
        Send
      </button>
    </div>
  );
}

export default MiniUserCard;
