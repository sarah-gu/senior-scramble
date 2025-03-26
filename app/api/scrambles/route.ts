import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export const DELETE = async (req: Request, res: Response) => {
  const { scrambleUni, userEmail } = await req.json();
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { scrambles: true },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    const existingScramble = existingUser.scrambles.find(
      (scramble) => scramble.uni === scrambleUni
    );

    if (!existingScramble) {
      throw new Error("Scramble not found");
    }

    const deletedScramble = await prisma.scramble.delete({
      where: { id: existingScramble.id, userId: existingUser.id },
    });

    return NextResponse.json({ message: "scrambleDeleted", deletedScramble });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error", err }, { status: 500 });
  }
};

// export const GET = async (req: Request, res: Response) => {
//   try {
//     const allUsers = await prisma.user.findMany(); // Retrieve all entries from the Prisma DB
//     return NextResponse.json({ users: allUsers });
//   } catch (err) {
//     console.log(err);
//     return NextResponse.json({ message: "error", err }, { status: 500 });
//   }
// };

export const PUT = async (req: Request, res: Response) => {
  const { userEmail, newScramble, spicySelect } = await req.json();
  try {
    if (newScramble == "" || !/\d{4}/.test(newScramble)) {
      return NextResponse.json(
        { message: "error", error: "Input a valid uni" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { scrambles: true }, // Include the existing user's scrambles
    });

    const roundTwoScrambles =
      existingUser?.scrambles.filter((s) => !s.isRoundOne) ?? [];
    if (!existingUser) {
      throw new Error("User not found");
    }

    if (roundTwoScrambles.length >= 10) {
      return NextResponse.json(
        { message: "error", error: "Max 10 scrambles" },
        { status: 400 }
      );
    }

    const scrambleExists = roundTwoScrambles.some(
      (scramble) => scramble.uni === newScramble
    );
    if (scrambleExists) {
      return NextResponse.json(
        { message: "error", error: "Scramble already exists for this user" },
        { status: 400 }
      );
    }

    // Step 2: Create a new Scramble record associated with the user
    const newScramblePush = await prisma.scramble.create({
      data: {
        uni: newScramble,
        displayType: spicySelect, // Assuming a default displayType value
        matched: false, // Assuming a default matched value
        isRoundOne: false,
        User: { connect: { id: existingUser.id } }, // Connect the Scramble to the existing user
      },
    });

    // Step 3: Update the user's scrambles field to include the new Scramble
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        scrambles: {
          // Add the new Scramble to the existing user's scrambles
          connect: { id: newScramblePush.id },
        },
      },
    });

    return NextResponse.json({ message: "scramblePush", newScramblePush }); // Return the newScramblePush in the response
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "error", err }, { status: 500 });
  }
};
