import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PUT = async (req: Request, res: Response) => {
  const { email, blob } = await req.json();
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
      include: { scrambles: true }, // Include the existing user's scrambles
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    // Step 3: Update the user's scrambles field to include the new Scramble
    const newUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        image: blob,
      },
    });

    return NextResponse.json({ message: "newUser", newUser });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error", err }, { status: 500 });
  }
};
