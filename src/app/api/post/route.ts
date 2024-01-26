import { $Enums } from "@prisma/client";
import prisma from "../../../../lib/prisma";

export default async function handler(req: { method: string; body: string; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { id?: string; title?: string; content?: string; createdAt?: Date; mood?: $Enums.Mood; message?: string; }): void; new(): any; }; }; }) {
  if (req.method === "POST") {
    try {
      const body = JSON.parse(req.body);
      const post = await prisma.entry.create({
        data: {
          title: body.title,
          content: body.content,
          
        },
      });
      res.status(200).json(post);
    } catch (error) {
      console.error("Error creating notes:", error);
      res.status(500).json({ message: "Failed to create notes" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
