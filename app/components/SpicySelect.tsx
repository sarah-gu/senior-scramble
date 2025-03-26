import { SetStateAction } from "react";

export const SpicyButton = ({
  text,
  isSelected,
  setSpicySelect,
}: {
  text: string;
  isSelected: boolean;
  setSpicySelect: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <button
      type="button"
      className={`${
        isSelected ? "bg-gray-500" : "bg-black hover:bg-gray-800"
      }  w-30 h-30 md:w-64 md:h-64 text-xs md:text-lg text-white border-2 border-white flex flex-col p-4 gap-2 md:gap-8 text-left`}
      onClick={() => setSpicySelect(text)}
    >
      <div>{text}</div>
      <div>
        {text === "regular (recommended)"
          ? "if the person you scramble scrambles you back we will notify BOTH of you. "
          : text === "discrete"
          ? "we will ONLY notify you if the person you scrambled scrambles you back ... ball’s in your court. "
          : "we will notify the person you scramble whether or not they scramble you back."}
      </div>
    </button>
  );
};
