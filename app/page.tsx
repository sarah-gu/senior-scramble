import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Login from "./login";
import Profile from "./profile";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Home() {
  // const session = await getServerSession(authOptions);
  // const user = session?.user;
  // const existingUser = await prisma.user.findUnique({
  //   where: {
  //     email: user?.email ?? "",
  //   },
  // });

  // if (
  //   user &&
  //   user.email &&
  //   !user.email.includes("@columbia") &&
  //   !user.email.includes("@barnard")
  // ) {
  //   return <Login />;
  // }

  // !existingUser &&
  //   user &&
  //   user.email &&
  //   user.name &&
  //   (await prisma.user.create({
  //     data: {
  //       email: user.email,
  //       name: user.name,
  //       uni: user.email.split("@")[0],
  //       image: "/egg.jpeg",
  //     },
  //   }));

  // return user && user.email && user.name ? (
  //   <Profile
  //     name={user.name}
  //     email={user.email}
  //     uni={user.email.split("@")[0]}
  //   />
  // ) : (
  //   <Login />
  // );
  return <Login />;
}
