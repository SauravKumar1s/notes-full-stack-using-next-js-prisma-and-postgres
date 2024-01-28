"use client"

import { Mood } from "@prisma/client";
import React from "react";

type Props = {
  id: string;
  title: string;
  content: string;
  mood: Mood;
};

async function deleteEntry(id: string) {
  await fetch(`/api/delete?id=${id}`, {
    method: "DELETE",
  });
  window.location.reload();
}

export default function Notes({ id, title, content, mood }: Props) {
  const handleDelete = async () => {
    await deleteEntry(id);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mt-8">
        <div className="mb-4 p-4 border border-gray-300 rounded-md">
          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p className="mb-2">{content}</p>
          <p className="text-sm text-gray-500 mb-2">{mood}</p>
          {/* Action buttons */}
          <div className="flex space-x-2">
            <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600">
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}