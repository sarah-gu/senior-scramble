"use client";
import { User } from "@prisma/client";

export const UpdateProfile = ({ existingUser }: { existingUser: User }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const bio = formData.get("bio") as string;
    const sexuality = formData.get("sexuality") as string;
    const pronouns = formData.get("pronouns") as string;
    const instagram = formData.get("instagram") as string;
    const school = formData.get("school") as string;
    const major = formData.get("major") as string;
    const eggs = formData.get("eggs") as string;
    const hidden = formData.get("hideProfile") === "on" ? true : false;

    try {
      const msg = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: existingUser.email,
          bio: bio,
          sexuality: sexuality,
          instagram: instagram,
          school: school,
          major: major,
          eggs: eggs,
          hidden: hidden,
          pronouns: pronouns,
        }),
      });
      const scrambleRetObj = await msg.json();
      scrambleRetObj.error
        ? alert("Error: Could not update bio")
        : alert("Bio updated");
    } catch (error) {
      console.error("Error sending PUT request:", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 w-full max-w-lg text-left text-black"
    >
      <div className="flex flex-col mb-4">
        <label htmlFor="school" className="text-black">
          School:
        </label>
        <select
          id="school"
          name="school"
          className="bg-gray-200 rounded p-2 border border-gray-400"
          defaultValue={existingUser.school ?? ""}
        >
          <option value="">Select School</option>
          <option value="CC">CC</option>
          <option value="SEAS">SEAS</option>
          <option value="BC">BC</option>
          <option value="GS">GS</option>
        </select>
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="major" className="text-black">
          Major:
        </label>
        <input
          type="text"
          id="major"
          name="major"
          className="bg-gray-200 rounded p-2 border border-gray-400"
          defaultValue={existingUser.major ?? ""}
          maxLength={30}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="pronouns" className="text-black">
          Pronouns:
        </label>
        <input
          type="text"
          id="pronouns"
          name="pronouns"
          className="bg-gray-200 rounded p-2 border border-gray-400"
          defaultValue={existingUser.pronouns ?? ""}
          maxLength={30}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="instagram" className="text-black">
          Instagram:
        </label>
        <input
          type="text"
          id="instagram"
          name="instagram"
          className="bg-gray-200 rounded p-2 border border-gray-400"
          defaultValue={existingUser.instagram ?? ""}
          maxLength={30}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="sexuality" className="text-black">
          Sexuality:
        </label>
        <input
          type="text"
          id="sexuality"
          name="sexuality"
          className="bg-gray-200 rounded p-2 border border-gray-400"
          defaultValue={existingUser.sexuality ?? ""}
          maxLength={30}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="bio (50 char)" className="text-black">
          Bio:
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          maxLength={50}
          className="bg-gray-200 rounded p-2 border border-gray-400 "
          defaultValue={existingUser.bio ?? ""}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="eggs" className="text-black">
          How do you like your eggs? (e.g. scrambled)
        </label>
        <textarea
          id="eggs"
          name="eggs"
          rows={1}
          maxLength={30}
          className="bg-gray-200 rounded p-2 border border-gray-400 "
          defaultValue={existingUser.eggs ?? ""}
        />
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        <button type="submit" className="bg-black text-white py-2 px-4 rounded">
          Update
        </button>
        <input
          type="checkbox"
          id="hideProfile"
          name="hideProfile"
          defaultChecked={existingUser.hidden}
          className="h-8 w-8"
        />
        <label htmlFor="hideProfile" className="text-black">
          Hide Profile
        </label>
      </div>
    </form>
  );
};
