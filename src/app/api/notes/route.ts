import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import * as jwt from "jsonwebtoken";
import { Mood } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const token = String(req.headers.get("cookie")?.replace("token=", ""));

    const user: any = jwt.verify(token, process.env.JWT_SECRET!);

    try {
      const entries = await prisma.entry.findMany({
        where: {
          userId: user.userId,
        },
      });
      return NextResponse.json({ entries });
    } catch (error) {
      return NextResponse.json({
        message: "Error fetching entries",
      });
    }
  } catch {
    return NextResponse.json({
      message: "jwt expired",
    });
  }
}

export async function POST(req: Request) {
  const token = String(req.headers.get("cookie")?.replace("token=", ""));

  const user: any = jwt.verify(token, process.env.JWT_SECRET!);

  try {
    const formData = await req.formData();

    const entry = await prisma.entry.create({
      data: {
        content: String(formData.get("content")),
        mood: String(formData.get("mood")) as Mood,
        title: String(formData.get("title")),
        userId: user.userId,
      },
    });
    return NextResponse.json({ entry });
  } catch (error) {
    return NextResponse.json({
      message: "Error Occured!",
      error,
    });
  }
}
