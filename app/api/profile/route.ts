import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export const PUT = async (req: Request, res: Response) => {
  const {
    email,
    bio,
    sexuality,
    instagram,
    school,
    major,
    eggs,
    hidden,
    pronouns,
  } = await req.json();

  console.log(bio, sexuality, instagram);
  try {
    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        bio: bio,
        sexuality: sexuality,
        instagram: instagram,
        school: school,
        major: major,
        eggs: eggs,
        hidden: hidden,
        pronouns: pronouns,
      },
    });

    return NextResponse.json({ message: "newUser", updatedUser });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error", err }, { status: 500 });
  }
};
