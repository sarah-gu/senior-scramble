import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient, Scramble } from "@prisma/client";
import { Header } from "@/components/Header";
import { DisplayScrambles } from "./form";

const prisma = new PrismaClient();

export default async function Scrambles() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // from prisma, get the list of scrambles that they have put in.

  if (!user || !user.email || !user.name) return <></>;

  const myScramblesAll = await prisma.user.findUnique({
    where: {
      email: user?.email ?? "",
    },
    select: {
      scrambles: true,
    },
  });

  const myScrambles = myScramblesAll?.scrambles.filter((s) => !s.isRoundOne);

  return user ? (
    <main className="w-screen h-screen overflow-scroll bg-scroll bg-gradient-to-r from-black to-blue-700 flex-col justify-center items-center">
      <Header name={user.name ?? ""} />
      <DisplayScrambles
        myScrambles={(myScrambles as Scramble[]) ?? []}
        userEmail={user.email}
      />
    </main>
  ) : (
    <>Please Log in</>
  );
}
