"use client"

import { Mood } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaEllipsisV } from "react-icons/fa";

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
  const [menuVisible, setMenuVisible] = useState(false);

  const handleDelete = async () => {
    await deleteEntry(id);
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    console.log("click to toggle")
  };

  return (
    <div className="mx-auto p-1 relative">
      <div className="mt-3">
        <div className="mb-4 p-4 border border-gray-300 rounded-md relative">
          <div className="absolute top-2 right-2 z-20">
            <div
              className="cursor-pointer"
              onClick={toggleMenu}
            >
              <FaEllipsisV />
            </div>
            {menuVisible && (
              <div className="absolute top-0 right-0 mt-8 bg-white shadow-md rounded-md p-2">
                <Link href={`/notes/edit?id=${id}`}>
                  <a className="block py-1 px-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    Edit
                  </a>
                </Link>
                <button
                  className="block py-1 px-2 text-red-600 hover:bg-gray-100 rounded-md"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <h2 className="text-lg font-semibold mb-2">{title}</h2>
          <p className="mb-2">{content}</p>
          {/* <p className="text-sm text-white mb-2 bg-blue-600 w-[80px] py-1 text-center rounded-full">{mood}</p> */}
        </div>
      </div>
    </div>
  );
}
