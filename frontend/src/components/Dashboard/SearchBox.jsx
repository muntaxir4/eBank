import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import axios from "axios";

import { SERVER_URL } from "../../.././.moon.config.js";
import MiniUserCard from "./MiniUserCard";

import { Command, CommandList, CommandInput } from "../ui/command.jsx";

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
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          placeholder="Search a user"
          onChangeCapture={(e) => setSearchTerm(e.target.value)}
        />
        <CommandList className="p-2 ml-0">
          {isPending && <p>Loading...</p>}
          {!isPending && (
            <ul>
              {data.users.map((user, index) => (
                <li key={index}>
                  <MiniUserCard {...user} />
                </li>
              ))}
              {data.users.length === 0 && <p>No users found</p>}
            </ul>
          )}
        </CommandList>
      </Command>
    </div>
  );
}

export default SearchBox;
