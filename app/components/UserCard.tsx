import { User } from "@prisma/client";
import Image from "next/image";
import { SetStateAction } from "react";

export const UserCard = ({
  user,
  toggleScrambleModal,
  setNewScramble,
}: {
  user: User;
  toggleScrambleModal: () => void;
  setNewScramble: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="bg-gradient-to-tr from-cyan-300 via-pink-300 to-yellow-200 p-1 rounded-lg items-center">
      <div
        className="w-60 h-[500px] bg-white text-black shadow-lg rounded-lg flex flex-col items-center text-center gap-2"
        key={user.id}
      >
        <div className="h-60 w-60">
          <Image
            src={user.image ?? "/egg.jpeg"}
            alt={`Selected Image`}
            width={240}
            height={240}
            className="h-60 w-60 object-cover rounded-t-lg"
          />
        </div>

        <div className="h-16">
          <p>{user.name}</p>
          <p>{user.uni}</p>
        </div>
        <div className="h-12 px-2">
          <div className="flex flex-row gap-1 flex-wrap">
            {user.pronouns !== "" && (
              <p className="bg-gray-300 border border-black text-[12px] rounded-full px-4">
                {user.pronouns}
              </p>
            )}
            {user.sexuality !== "" && (
              <p className="bg-gray-300 border border-black text-[12px] rounded-full px-4 ">
                {user.sexuality}
              </p>
            )}
            {user.major !== "" && (
              <p className="bg-gray-300 border border-black text-[12px] rounded-full px-4">
                {user.major}
              </p>
            )}
            {user.school !== "" && (
              <p className="bg-gray-300 border border-black text-[12px] rounded-full px-4">
                {user.school}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col h-24 px-2">
          <div>
            {user.instagram !== "" && (
              <p className="text-gray-600 text-xs text-center mt-2 text-wrap w-full break-all">
                IG: @{user.instagram}
              </p>
            )}
          </div>
          <div>
            {user.bio !== "" && (
              <p className="text-gray-600 text-xs text-center mt-2 text-wrap w-full break-all">
                BIO: {user.bio}
              </p>
            )}
          </div>

          <div>
            {user.eggs !== "" && (
              <p className="text-gray-600 text-xs text-center mt-2 text-wrap w-full break-all">
                EGGS: {user.eggs}
              </p>
            )}
          </div>
        </div>

        {/* <button
          className="w-full rounded-b-lg bg-gray-200 hover:bg-yellow-300 active:bg-blue-300 h-16 mt-auto"
          onClick={() => {
            toggleScrambleModal();
            setNewScramble(user.uni);
          }}
        >
          SCRAMBLE
        </button> */}
      </div>
    </div>
  );
};
