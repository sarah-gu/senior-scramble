import Login from "@/login";
import { PrismaClient, Scramble, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import fs from "fs";
import { DisplayMatches } from "./match";
import { Header } from "@/components/Header";

const prisma = new PrismaClient();

export default async function Matches() {
  const users: User[] = await prisma.user.findMany();
  const scrambles = await prisma.scramble.findMany();

  const session = await getServerSession(authOptions);
  const user = session?.user;
  let matchCount = 0;

  if (
    user &&
    user.email &&
    !user.email.includes("@columbia") &&
    !user.email.includes("@barnard")
  ) {
    return <Login />;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: user?.email ?? "",
    },
  });

  if (!existingUser) {
    return <Login />;
  }

  // for (const existingUser of users) {
  //   console.log(existingUser.uni);
  // Get the people who i've scrambled
  const myChosenScrambles = scrambles.filter(
    (scramble) => scramble.userId === existingUser.id && !scramble.isRoundOne
  );
  // Add the people who I've scrambled UNI's
  const updatedChosenScramblesWithUni = myChosenScrambles
    .map((s) => {
      const user = users.filter((u) => u.uni === s.uni);
      return user.length === 0
        ? { ...s, scrambleId: -1 }
        : { ...s, scrambleId: user[0].id };
    })
    .filter((u) => u.scrambleId !== -1);

  // Get the people who scrambled ME
  const iGotScrambled = scrambles.filter(
    (scramble) => scramble.uni === existingUser.uni && !scramble.isRoundOne
  );

  const matches = iGotScrambled.filter((scramble) => {
    if (scramble.displayType === "spicy") {
      return true;
    }

    const iAlsoScrambled = updatedChosenScramblesWithUni.filter(
      (myChosenScramble) => myChosenScramble.scrambleId === scramble.userId
    );

    if (
      iAlsoScrambled.length === 0 ||
      (scramble.displayType === "discrete" &&
        iAlsoScrambled[0].displayType !== "discrete")
    ) {
      return false;
    }
    return true;
  });
  matchCount += matches.length;
  const updatedMatchesWithUni: (Scramble & { scrambler: User[] })[] =
    matches.map((s) => {
      const user = users.filter((u) => u.id === s.userId);
      return { ...s, scrambler: user };
    });

  return user ? (
    <main className="w-screen h-screen overflow-scroll bg-scroll bg-gradient-to-r from-black to-blue-700 flex-col justify-center items-center">
      <Header name={user.name ?? ""} />
      <DisplayMatches
        userEmail={existingUser.email}
        myMatches={updatedMatchesWithUni}
        myScrambles={myChosenScrambles}
      />
    </main>
  ) : (
    <>Please Log in</>
  );
}
