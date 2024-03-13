// pages/api/login.ts
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken"; // Import jsonwebtoken

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Ensure you have a secret key

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json(
        { user: null, message: "User not found" },
        { status: 404 }
      );
    }

    const passwordMatch = compare(password, user.password!);

    if (!passwordMatch) {
      return NextResponse.json(
        { user: null, message: "Invalid password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Return success response with token
    return NextResponse.json(
      { user, token, message: "Login successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);

    // Return an error response
    return NextResponse.json(
      { user: null, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
