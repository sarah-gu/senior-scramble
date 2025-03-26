import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { Header } from "@/components/Header";
import UserDisplay from "./display";

const prisma = new PrismaClient();

export default async function Browse() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  // from prisma, get the list of scrambles that they have put in.

  if (!user || !user.email || !user.name) return <p>Log in please</p>;

  const allUsers = await prisma.user.findMany();
  const filteredUsers = allUsers.filter((user) => !user.hidden);

  const sortedUsers = filteredUsers.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return (
    <main className="overflow-scroll w-screen h-screen bg-gradient-to-r from-black to-blue-700 justify-center items-center">
      <Header name={user.name ?? ""} />
      <UserDisplay allUsers={sortedUsers ?? []} userEmail={user.email} />
    </main>
  );
}
