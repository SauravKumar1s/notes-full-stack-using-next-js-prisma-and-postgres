// "use client"
import React from "react";
import { Mood } from "@prisma/client";
import axios from "@/lib/axios";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function CreatePage() {
  const moods = Object.values(Mood);
  const cookie = cookies().get("token");
  async function createEntry(data: FormData) {
    "use server";

    await axios.post("/api/notes", data, {
      headers: {
        Cookie: `${cookie?.name}=${cookie?.value}`,
      },
    });
    
    redirect("/notes");

    
  }


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-start mb-4">
        <button
          // onClick={goBack}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
        >
          Back
        </button>
      </div>
      <form
        action={createEntry}
        className="max-w-md mx-auto bg-white p-8 border rounded shadow"
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
            className="mt-1 p-2 border border-gray-300 rounded w-full"
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
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            rows={4}
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
            id="mood"
            defaultValue=""
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="" disabled>
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
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Create
        </button>
      </form>
    </div>
  );
}
