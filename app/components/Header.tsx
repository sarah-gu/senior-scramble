"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@react-hook/media-query";

export const Header = ({ name }: { name: string }) => {
  const router = useRouter();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return name ? (
    <header className="flex flex-col">
      <div className="fixed top-0 left-0 w-full h-16 z-50 bg-gray-800 text-white p-4 text-sm flex flex-row justify-between">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="text-sm md:text-2xl"
        >
          {isSmallScreen
            ? "🍳 CU Scramble 2024"
            : "🍳 Columbia Senior Scramble 2024"}
        </button>
        <div className="flex flex-row justify-center items-center gap-4">
          <button
            onClick={() => {
              router.push("/browse");
            }}
            className="hover:bg-gray-600 h-16 p-2"
          >
            {isSmallScreen ? "😉" : "Browse 😉"}
          </button>
          <button
            onClick={() => {
              router.push("/profile");
            }}
            className="hover:bg-gray-600 h-16 p-2"
          >
            {isSmallScreen ? "👤" : `${name} 👤`}
          </button>
          <button
            onClick={() => {
              router.push("/matches");
            }}
            className="hover:bg-gray-600 h-16 p-2"
          >
            {isSmallScreen ? "❤️" : "Matches ❤️"}
          </button>
          {/* <button
            onClick={() => {
              router.push("/scrambles");
            }}
            className="hover:bg-gray-600 h-16 p-2"
          >
            {isSmallScreen ? "📝" : "Scrambles 📝"}
          </button> */}
          <button
            className="hover:bg-gray-600 h-16 p-2" // ADD SVG FOR LOGOUT
            onClick={() => {
              router.push("/");
              signOut();
            }}
          >
            {isSmallScreen ? "👋" : "Logout 👋"}
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-r from-green-500 via-blue-600 to-pink-500 h-16 mt-1 w-screen z-10"></div>
    </header>
  ) : (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 z-50 text-sm flex justify-between bg-opacity-50 shadow-md ">
      <div>Columbia Senior Scramble 2024</div>
      <div></div>
    </header>
  );
};
