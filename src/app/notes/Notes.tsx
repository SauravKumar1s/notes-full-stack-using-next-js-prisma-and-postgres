import { Mood } from "@prisma/client";
import prisma from "../../../lib/prisma";
import React from "react";
import Link from "next/link";

type Props = {
  id: string;
  title: string;
  content: string;
  mood: Mood;
};

export default async function Notes({ id, title, content, mood }: Props) {
  const entries = await prisma.entry.findMany();

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/notes/add/create"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Add Notes
      </Link>

      <div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-lg mb-2">{content}</p>
        <p className="text-sm text-gray-500">{mood}</p>
      </div>

      <div className="mt-8">
        {entries.map((note, index) => (
          <div
            key={index}
            className="mb-4 p-4 border border-gray-300 rounded-md"
          >
            <h2 className="text-lg font-semibold mb-2">{note.title}</h2>
            <p className="mb-2">{note.content}</p>
            <p className="text-sm text-gray-500 mb-2">{note.mood}</p>
            {/* Action buttons */}
            <div className="flex space-x-2">
              <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600">
                Edit
              </button>
              <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
