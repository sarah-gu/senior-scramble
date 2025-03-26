import { User } from "@prisma/client";
import { SetStateAction } from "react";

export const SearchBar = ({
  allUsers,
  setFilteredUsers,
}: {
  allUsers: User[];
  setFilteredUsers: React.Dispatch<SetStateAction<User[]>>;
}) => {
  return (
    <input
      type="text"
      className="px-4 m-4 md:m-8 w-1/2 rounded-lg items-center h-12 justify-center flex"
      placeholder="Search users..."
      onChange={(e) => {
        const searchValue = e.target.value.toLowerCase();
        const filteredUsers = allUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(searchValue) ||
            user.uni.toLowerCase().includes(searchValue)
        );
        setFilteredUsers(filteredUsers);
      }}
    />
  );
};
