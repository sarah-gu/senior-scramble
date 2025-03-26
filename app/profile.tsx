"use client";
import { Header } from "@/components/Header";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@react-hook/media-query";
import FAQ from "./components/faq";

export default function Profile({
  name,
  email,
  uni,
}: {
  name: string;
  email: string;
  uni: string;
}) {
  const router = useRouter();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <main className="w-screen overflow-y-scroll snap-y snap-mandatory bg-gradient-to-r from-black to-blue-700 md:bg-[url(./background.gif)] flex-col justify-center items-center">
      <Header name={name} />
      <div className="snap-start font-mono flex flex-col p-12 pt-48 pb-48 md:p-64 items-center justify-center text-white text-wrap text-6xl md:text-8xl gap-4 md:gap-16 ">
        <div>senior scramble</div>
        <div className="font-mono text-sm md:text-4xl text-gray-400">
          welcome {uni}
        </div>

        {isSmallScreen ? (
          <div className="flex flex-col">
            <button
              className="p-4 text-xl hover:bg-indigo-900 active:bg-indigo-950"
              onClick={() => {
                router.push("/matches");
              }}
            >
              ❤️ matches
            </button>
            <button
              className="p-4 text-xl hover:bg-indigo-900 active:bg-indigo-950"
              onClick={() => {
                router.push("/browse");
              }}
            >
              😉 browse
            </button>
            <button
              className="p-4 text-xl hover:bg-indigo-900 active:bg-indigo-950"
              onClick={() => {
                router.push("/profile");
              }}
            >
              👤 profile
            </button>
            {/* <button
              className="p-4 text-xl hover:bg-indigo-900 active:bg-indigo-950"
              onClick={() => {
                router.push("/scrambles");
              }}
            >
              📝 my scrambles
            </button> */}
          </div>
        ) : (
          <button
            className="p-8 text-sm md:text-3xl border-2 hover:bg-indigo-900 active:bg-indigo-950"
            onClick={() => {
              router.push("/matches");
            }}
          >
            → my matches
          </button>
        )}

        <h1 className="font-mono text-white text-4xl m-12 w-full text-center">
          FAQ ⬇️
        </h1>
      </div>

      <div className="mt-[-200px] md:mt-[-300px] snap-start flex flex-col items-center justify-center bg-opaque-50 shadow-lg text-black"></div>
      <div className="p-5">
        <FAQ />
      </div>
    </main>
  );
}
