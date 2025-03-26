"use client";

import { SubmitScramble } from "@/components/SubmitScramble";
import { Scramble } from "@prisma/client";
import { useState } from "react";

export const DisplayScrambles = ({
  myScrambles,
  userEmail,
}: {
  myScrambles: Scramble[];
  userEmail: string;
}) => {
  const [newScramble, setNewScramble] = useState("");
  const [allScrambles, setAllScrambles] = useState(myScrambles);
  const [spicySelect, setSpicySelect] = useState("regular (recommended)");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const msg = await fetch("/api/scrambles", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail,
          newScramble,
          spicySelect,
        }),
      });
      const scrambleRetObj = await msg.json();

      scrambleRetObj.error
        ? alert(`Error: ${scrambleRetObj.error}`)
        : setAllScrambles([scrambleRetObj.newScramblePush, ...allScrambles]);
      setNewScramble("");
    } catch (error) {
      console.error("Error sending PUT request:", error);
    }
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    scrambleUni: string
  ) => {
    e.preventDefault();
    try {
      const msg = await fetch("/api/scrambles", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, scrambleUni }),
      });
      setAllScrambles(
        allScrambles.filter((scramble) => scramble.uni != scrambleUni)
      );
    } catch (error) {
      console.error("Error sending PUT request:", error);
    }
  };

  return (
    <div className="gap-12 flex flex-col md:flex-row p-4 md:p-32 justify-between">
      <div className="flex flex-col gap-8">
        <div className="text-white text-5xl font-bold">scrambles</div>
        <div className="flex flex-col gap-8">
          {allScrambles.length === 0 ? (
            <p className="text-white"> add your first scramble</p>
          ) : (
            allScrambles.map((scramble, index) => (
              <div
                className="p-4 text-white flex flex-row justify-between bg-black border-2 border-white gap-4 rounded-lg shadow-lg"
                key={index}
              >
                <div className="flex flex-col gap-2">
                  <div className="font-bold">{scramble.uni} </div>
                  <div>{scramble.displayType}</div>
                </div>

                <button
                  onClick={(e) => handleDelete(e, scramble.uni)}
                  className="p-4 h-4 w-4 flex items-center justify-center bg-white text-black font-bold text-lg rounded-md shadow-lg  hover:bg-slate-100 active:bg-slate-200"
                >
                  x
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col gap-12">
        <div className="text-white text-5xl font-bold">add scramble</div>
        <SubmitScramble
          spicySelect={spicySelect}
          newScramble={newScramble}
          handleSubmit={handleSubmit}
          setNewScramble={setNewScramble}
          setSpicySelect={setSpicySelect}
        />
      </div>
    </div>
  );
};
