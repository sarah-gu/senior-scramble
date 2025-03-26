import { SetStateAction } from "react";
import { SpicyButton } from "./SpicySelect";

export const SubmitScramble = ({
  spicySelect,
  newScramble,
  handleSubmit,
  setNewScramble,
  setSpicySelect,
}: {
  spicySelect: string;
  newScramble: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setNewScramble: React.Dispatch<SetStateAction<string>>;
  setSpicySelect: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <form className="flex flex-col gap-8 items-left" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter scramble UNI"
        className="w-full h-12 p-2 rounded-md shadow-md"
        value={newScramble}
        onChange={(e) => setNewScramble(e.target.value)}
      />
      <div className="flex flex-col md:flex-row gap-2">
        <SpicyButton
          text="regular (recommended)"
          isSelected={spicySelect === "regular (recommended)"}
          setSpicySelect={setSpicySelect}
        />
        <SpicyButton
          text="discrete"
          isSelected={spicySelect === "discrete"}
          setSpicySelect={setSpicySelect}
        />
        <SpicyButton
          text="spicy"
          isSelected={spicySelect === "spicy"}
          setSpicySelect={setSpicySelect}
        />
      </div>

      <button
        type="submit"
        className="w-32 h-16 bg-white text-black font-bold text-lg rounded-md shadow-lg"
      >
        SCRAMBLE
      </button>
    </form>
  );
};
