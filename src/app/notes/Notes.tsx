"use client";

import { Mood } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
type Props = {
  id: string;
  title: string;
  content: string;
  mood: Mood;
};

// async function deleteEntry(id: string) {
//   await fetch(`/api/delete?id=${id}`, {
//     method: "DELETE",
//   });

//   window.location.reload();
// }

export default function Notes({ id, title, content, mood }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const handleDelete = async () => {
    await fetch(`/api/delete?id=${id}`, {
      method: "DELETE",
    });
    setPopupMessage("Note deleted successfully!");
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
    window.location.reload();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="mx-auto py-4">
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white py-2 px-4 text-center">
          {popupMessage}
        </div>
      )}
      <div className="mt-">
        <div className="mb-0 p-4 border border-gray-300 rounded-md">
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-semibold mb-2">{title}</h2>
              <p className="mb-2">{content}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleMenu}
                className="bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600"
              >
                <CiMenuKebab />
              </button>
              {/* Side menu for actions */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl">
                  <Link href={`/notes/edit?id=${id}`}>
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Edit
                    </div>
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
