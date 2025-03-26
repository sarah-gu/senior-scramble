import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Header } from "@/components/Header";
import UploadComponent from "./UploadPhoto";

import { PrismaClient } from "@prisma/client";
import { UpdateProfile } from "./form";

const prisma = new PrismaClient();

export default async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user || !user.name || !user.email) return <></>;

  const existingUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!existingUser || !existingUser.name || !existingUser.email)
    return <p>Log in please</p>;

  return (
    <main className="w-screen h-screen overflow-scroll bg-gradient-to-r from-black to-blue-700 justify-center items-center">
      <Header name={user.name} />
      <div className="flex items-center justify-center m-4 text-black">
        <div className="bg-gradient-to-tr from-cyan-500 via-purple-500 to-yellow-300 p-1 rounded-lg items-center">
          <div className="text-center w-full bg-gray-100 bg-opacity-75 shadow-lg rounded-lg p-8 flex flex-col md:flex-row gap-8">
            <div>
              <div className="text-sm md:text-5xl m-4">Edit Profile</div>

              <UploadComponent
                customImg={existingUser.image}
                defaultImg={user.image ?? "/egg.jpeg"}
                email={user.email}
              />
              <div className="mt-4">{existingUser.name}</div>
              <div>{existingUser.uni}</div>
            </div>

            <UpdateProfile existingUser={existingUser} />
          </div>
        </div>
      </div>
    </main>
  );
}
