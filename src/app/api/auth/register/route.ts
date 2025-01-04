import { signUpSchema } from "@/schema/sign-up-schema";
import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const result = signUpSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json("Missing fields, Wrong Data", { status: 400 });
  }

  const { email, password, username } = result.data;

  try {
    const existedUsername = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (existedUsername)
      return NextResponse.json("Username is already taken", { status: 409 });

    const existedUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existedUser)
      return NextResponse.json("Email is already Taken", { status: 409 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(newUser, { status: 200 });
  } catch (err) {
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}