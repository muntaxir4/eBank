import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";

import { SERVER_URL } from "../../.././.moon.config.js";
import MiniUserCard from "./MiniUserCard";

function useDebounce(searchTerm, delay) {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  useEffect(() => {
    const timeoutId = setTimeout(
      () => setDebouncedSearchTerm(searchTerm),
      delay
    );
    return () => clearTimeout(timeoutId);
  }, [searchTerm, delay]);

  return useQuery({
    queryKey: [debouncedSearchTerm],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${SERVER_URL}/user/users/bulk?filter=${debouncedSearchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
  });
}

function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isPending } = useDebounce(searchTerm, 500);

  return (
    <div className="m-2 flex flex-col">
      <input
        type="text"
        name=""
        id=""
        className=" w-full border border-black rounded-md p-1 self-center"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search Users"
      />
      {isPending && <p>Loading...</p>}
      {!isPending && (
        <ul className="m-2 max-h-2/5 overflow-h-scroll w-full self-center">
          {data.users.map((user, index) => (
            <li key={index}>
              <MiniUserCard {...user} />
            </li>
          ))}
          {data.users.length === 0 && <p>No users found</p>}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
