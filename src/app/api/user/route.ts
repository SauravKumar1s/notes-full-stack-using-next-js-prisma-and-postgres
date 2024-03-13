import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken"; // Import jsonwebtoken

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Ensure you have a JWT secret

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = body;

    // Check if user with the given email or username already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    const existingUserByUsername = await prisma.user.findUnique({
      where: { username: username },
    });
    if (existingUserByUsername) {
      return NextResponse.json(
        { user: null, message: "Username already exists" },
        { status: 409 }
      );
    }

    // Hash password and create new user
    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token for the new user
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "2h" } // Token expires in 2 hours
    );

    // Return success response with user info and JWT token
    return NextResponse.json(
      { user: newUser, token: token, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in user creation:", error);
    // Return an error response
    return NextResponse.json(
      { user: null, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const token = String(req.headers.get("cookie")?.replace("token=", ""));

  const user = jwt.verify(token, JWT_SECRET);

  return NextResponse.json({
    user,
  });
}
