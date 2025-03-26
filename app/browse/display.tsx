"use client";
import { SubmitScramble } from "@/components/SubmitScramble";
import { UserCard } from "@/components/UserCard";
import { User } from "@prisma/client";
import { useState } from "react";
import { SearchBar } from "./search";

export default function UserDisplay({
  allUsers,
  userEmail,
}: {
  allUsers: User[];
  userEmail: string;
}) {
  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const [isScrambleModalOpen, setIsScrambleModalOpen] = useState(false);
  const [newScramble, setNewScramble] = useState("");
  const [spicySelect, setSpicySelect] = useState("regular (recommended)");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const msg = await fetch("/api/scrambles", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, newScramble, spicySelect }),
      });
      const scrambleRetObj = await msg.json();

      scrambleRetObj.error
        ? alert("Error: You've already scrambled this UNI!")
        : alert("scramble added");
      toggleScrambleModal();
    } catch (error) {
      console.error("Error sending PUT request:", error);
    }
  };

  const toggleScrambleModal = () => {
    setIsScrambleModalOpen(!isScrambleModalOpen);
  };
  return (
    <div>
      <div className="h-screen mt-4 md:mt-18 flex flex-col items-center">
        <SearchBar allUsers={allUsers} setFilteredUsers={setFilteredUsers} />

        <div className="flex flex-wrap justify-center gap-8 overflow-y-auto">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              toggleScrambleModal={toggleScrambleModal}
              setNewScramble={setNewScramble}
            />
          ))}
        </div>
      </div>
      {isScrambleModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
          <div className="flex flex-col z-10 bg-gray-200 m-10 p-6 gap-4 rounded-lg">
            <div className="flex flex-row justify-between">
              <div className="text-3xl">NEW SCRAMBLE</div>
              <button
                type="button"
                className="text-lg bg-gray-200 text-gray-800 rounded-lg"
                onClick={toggleScrambleModal}
              >
                X
              </button>
            </div>
            <SubmitScramble
              spicySelect={spicySelect}
              newScramble={newScramble}
              handleSubmit={handleSubmit}
              setNewScramble={setNewScramble}
              setSpicySelect={setSpicySelect}
            />
          </div>
        </div>
      )}
    </div>
  );
}
