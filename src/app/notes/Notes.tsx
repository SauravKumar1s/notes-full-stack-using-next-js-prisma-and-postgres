"use client";

import { Mood } from "@prisma/client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { CiMenuKebab } from "react-icons/ci";

// Popup component for showing full note details
const NotePopup = ({ title, content, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="mb-4">{content}</p>
      <button onClick={onClose} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Close</button>
    </div>
  </div>
);

type Props = {
  id: string;
  title: string;
  content: string;
  mood: Mood;
};

export default function Notes({ id, title, content, mood }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false); 
  const menuRef = useRef(null); 

  const handleDelete = async () => {
    await fetch(`/api/delete?id=${id}`, {
      method: "DELETE",
    });
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
    window.location.reload();
  };

  const toggleMenu = (e: any) => {
    e.stopPropagation(); 
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="mx-auto py-4">
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white py-2 px-4 text-center">
          Note deleted successfully!
        </div>
      )}
      <div className="mt-4" onClick={() => setShowDetailsPopup(true)}>
        <div className="mb-4 p-4 border border-gray-300 rounded-md">
          <div className="flex justify-between" ref={menuRef}>
            <div>
              <h2 className="text-lg font-semibold mb-2">{title.substring(0, 30) + (title.length > 30 ? "..." : "")}</h2>
              <p className="mb-2">{content.substring(0, 30) + (content.length > 30 ? "..." : "")}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleMenu}
                className="bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600"
              >
                <CiMenuKebab />
              </button>
              {isMenuOpen && (
                <div className="absolute z-100 sm:right-16 right-2  py-2 w-48 bg-white rounded-md shadow-xl">
                  <Link href={`/notes/edit?id=${id}`}>
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={(e) => e.stopPropagation()}>Edit</div>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleDelete();
                    }}
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
      {showDetailsPopup && <NotePopup title={title} content={content} onClose={() => setShowDetailsPopup(false)} />}
    </div>
  );
}
