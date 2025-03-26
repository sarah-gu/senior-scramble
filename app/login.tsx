"use client";

import { signIn } from "next-auth/react"; // Import the signIn function from NextAuth for authentication.
import { useSearchParams } from "next/navigation";
import { Header } from "./components/Header";
import "./login.css";
import FAQ from "./components/faq";

export default function Login({ isNonCU }: { isNonCU?: boolean }) {
  const searchParams = useSearchParams(); // Get query parameters from the URL.
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  return (
    <main
      className={`w-screen bg-gradient-to-r from-black to-blue-700 md:bg-[url(./background.gif)] flex-col gap-12 p-8 md:p-32 min-h-screen`}
    >
      <Header name="" />
      <div className="font-mono absolute top-1/4 md:top-1/2 text-white text-wrap text-6xl md:text-7xl">
        <p>senior scramble</p>
        <p className="text-white top-1/4 mt-24 absolute text-sm">
          Thanks for scrambling with us :)
        </p>
      </div>

      <div className="absolute top-1/4 md:top-1/2 w-32 mt-32">
        {/* <button
          className="font-mono text-sm md:text-lg w-24 lg:w-32 bg-white text-black hover:bg-gray-300 p-4 rounded-lg shadow-lg mb-12"
          onClick={() => signIn("google", { callbackUrl })}
        >
          LOGIN →
        </button> */}

        <h1 className="font-mono text-white text-4xl m-24 w-full text-center">
          FAQ ⬇️
        </h1>
      </div>

      <div className="mt-[600px] md:mt-[750px] snap-start flex flex-col items-center justify-center bg-opaque-50 shadow-lg text-black"></div>
      <FAQ />
    </main>
  );
}
