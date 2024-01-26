import React from "react";
import { Mood } from "@prisma/client";
import { redirect } from "next/navigation";
import prisma from "../../../../../lib/prisma";

async function createEntry(data: FormData) {
  "use server";
  const formData = {
    title: data.get("title")!.toString(),
    content: data.get("content")!.toString(),
    mood: data.get("mood")! as Mood,
  };
  await prisma.entry.create({ data: formData });
  redirect("/");
}

export default function CreatePage() {
  const moods = Object.values(Mood);

  return (
    <div className="container mx-auto p-4">
      <form
        className="max-w-md mx-auto bg-white p-8 border rounded-md shadow-md"
        action={createEntry}
      >
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter title"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            placeholder="Enter content"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="mood"
          >
            Mood
          </label>
          <select
            name="mood"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="" disabled selected>
              Select a mood
            </option>
            {moods.map((mood, idx) => (
              <option key={idx} value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Create
        </button>
      </form>
    </div>
  );
}
