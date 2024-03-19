"use client";
import React, { useState } from "react";
import Notes from "../app/notes/Notes";
function Categories({ entries  }) {
  const [filteredData, setFilteredData] = useState(entries);

  const filterByMood = (mood : any) => {
    const filtered = entries?.filter((item : any) => item.mood === mood);
    setFilteredData(filtered);
  };

  const showAllNotes = () => {
    setFilteredData(entries)
  }

  return ( 
    <div>
      <div className="grid grid-cols-5 gap-4">
        {/* all notes  */}
      <button
          onClick={showAllNotes}
          className="flex flex-col items-center justify-center text-gray-800 px-4 py-4 flex-1 rounded-md shadow-md bg-purple-200 hover:bg-purple-400 border border-gray-400"
        >
          <span className="sm:text-sm text-xs">All Notes</span>
        </button>
        {/* Work */}
        <button
          onClick={() => filterByMood("Work")}
          className="flex flex-col items-center justify-center text-gray-800 px-4 py-4 flex-1 rounded-md shadow-md bg-green-200 hover:bg-green-400 border border-gray-400"
        >
          {/* <MdWork className="sm:w-8 sn:h-8 w-6 h-6 mb-2" /> */}
          <span className="sm:text-sm text-xs">Work</span>
        </button>

        {/* Travel */}
        <button
          onClick={() => filterByMood("Travel")}
          className="flex flex-col items-center justify-center text-gray-800 px-4 py-4 flex-1 rounded-md shadow-md bg-blue-200 hover:bg-blue-400 border border-gray-400"
        >
          {/* <MdFlight className="sm:w-8 sn:h-8 w-6 h-6 mb-2" /> */}
          <span className="sm:text-sm text-xs">Travel</span>
        </button>

        {/* Personal */}
        <button
          onClick={() => filterByMood("Personal")}
          className="flex flex-col items-center justify-center text-gray-800 px-4 py-4 flex-1 rounded-md shadow-md bg-yellow-200 hover:bg-yellow-400 border border-gray-400"
        >
          {/* <MdPerson className="sm:w-8 sn:h-8 w-6 h-6 mb-2" /> */}
          <span className="sm:text-sm text-xs">Personal</span>
        </button>

        {/* Health */}
        <button
          onClick={() => filterByMood("Health")}
          className="flex flex-col items-center justify-center text-gray-800 px-4 py-4 flex-1 rounded-md shadow-md bg-red-200 hover:bg-red-400 border border-gray-400"
        >
          {/* <MdFavorite className="sm:w-8 sn:h-8 w-6 h-6 mb-2" /> */}
          <span className="sm:text-sm text-xs">Health</span>
        </button>
      </div>
      {filteredData?.length < 1 ? (
        <p className="text-center mt-8 text-red-500">No Notes</p>
      ) : (
        filteredData?.map((entry) => <Notes key={entry.id} {...entry} />)
      )}
    </div>
  );
}

export default Categories;
