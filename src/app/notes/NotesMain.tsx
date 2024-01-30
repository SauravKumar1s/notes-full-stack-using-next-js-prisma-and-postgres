"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import Notes from "./Notes";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [entries, setEntries] = useState([]);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);

    try {
      const response = await axios.get(`/api/notes/${category}`);
      setEntries(response.data);
    } catch (error) {
      console.error(error);

    }
  };

  const getFilteredEntries = () => {
    if (selectedCategory === 'all') {
      return entries;
    } else {
      return entries.filter(entry => entry.category === selectedCategory);
    }
  };

  return (
    <>
      <div className="container p-4">
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out">
          <div>
            <button onClick={() => handleCategoryClick('all')}>All</button>
            <button onClick={() => handleCategoryClick('work')}>Work</button>
            <button onClick={() => handleCategoryClick('personal')}>Personal</button>
            <button onClick={() => handleCategoryClick('travel')}>Travel</button>
            <button onClick={() => handleCategoryClick('health')}>Health</button>
          </div>
        </div>
        <Link
          href="/notes/add/create"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 fixed bottom-16 right-4"
        >
          Add Notes
        </Link>
        {getFilteredEntries().map((entry) => (
          <Notes key={entry.id} {...entry} />
        ))}
      </div>
    </>
  );
}