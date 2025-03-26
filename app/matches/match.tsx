"use client";

import { Scramble, User } from "@prisma/client";
import Image from "next/image";

export const DisplayMatches = ({
  myMatches,
  myScrambles,
  userEmail,
}: {
  myMatches: (Scramble & { scrambler: User[] })[];
  myScrambles: Scramble[];
  userEmail: string;
}) => {
  return (
    <div className="gap-12 flex flex-col md:flex-row p-4 md:p-32 justify-between">
      <div className="flex flex-col gap-12">
        <div className="text-white text-5xl font-bold">matches</div>
        {myMatches.length === 0 ? (
          <p className="text-white">
            no matches - pro tip: try scrambling SPICY next round ;)
          </p>
        ) : (
          myMatches.map((match, index) => (
            <div
              className="p-4 text-white flex flex-row justify-between bg-black border-2 border-white gap-4 rounded-lg shadow-lg"
              key={index}
            >
              <div className="flex flex-col gap-2 text-center items-center justify-center">
                <Image
                  src={match.scrambler[0].image ?? "/egg.jpeg"}
                  alt={`Selected Image`}
                  width={240}
                  height={240}
                  className="h-60 w-60 object-cover rounded-t-lg"
                />
                <div className="font-bold">{match.scrambler[0].name} </div>
                <div>
                  {match.scrambler[0].uni}{" "}
                  {match.displayType === "spicy" && "🔥"}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex flex-col gap-8">
        <div className="text-white text-5xl">round two scrambles</div>
        <div className="flex flex-col gap-8">
          {myScrambles.length === 0 ? (
            <p className="text-white">no scrambled UNIs....!</p>
          ) : (
            myScrambles.map((scramble, index) => (
              <div
                className="p-4 text-white flex flex-row justify-between bg-black border-2 border-white gap-4 rounded-lg shadow-lg"
                key={index}
              >
                <div className="flex flex-col gap-2">
                  <div className="font-bold">{scramble.uni} </div>
                  <div>{scramble.displayType}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
