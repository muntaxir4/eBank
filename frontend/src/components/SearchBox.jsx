import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isPending, error } = useQuery({
    queryKey: [searchTerm],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://192.168.0.168:3000/user/users/bulk?filter=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
  });
  return (
    <div className="m-2">
      <input
        type="text"
        name=""
        id=""
        className="bg-slate-200 w-full border border-black rounded-sm p-1"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isPending && <p>Loading...</p>}
      {data && (
        <ul className="m-4">
          {data.users.map((user, index) => (
            <li key={index}>
              {user.firstName} {user.lastName}{" "}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
