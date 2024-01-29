import Link from "next/link";
import prisma from "../../lib/prisma";
import Notes from "./notes/Notes";
import {
  FaUser,
  FaBriefcase,
  FaPlane,
  FaHeartbeat,
  FaStickyNote,
} from "react-icons/fa";

export default async function Home() {
  const entries = await prisma.entry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="container p-4">
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out">
          <div className="flex justify-around items-center">
            <div className="flex items-center hover:text-purple-500 cursor-pointer">
              <FaStickyNote className="text-gray-600" />
              <span className="ml-2 text-lg">All Notes</span>
            </div>
            <div className="flex items-center hover:text-blue-500 cursor-pointer">
              <FaUser className="text-gray-600" />
              <span className="ml-2 text-lg">Personal</span>
            </div>
            <div className="flex items-center hover:text-green-500 cursor-pointer">
              <FaBriefcase className="text-gray-600" />
              <span className="ml-2 text-lg">Work</span>
            </div>
            <div className="flex items-center hover:text-orange-500 cursor-pointer">
              <FaPlane className="text-gray-600" />
              <span className="ml-2 text-lg">Travel</span>
            </div>
            <div className="flex items-center hover:text-red-500 cursor-pointer">
              <FaHeartbeat className="text-gray-600" />
              <span className="ml-2 text-lg">Health</span>
            </div>
          </div>
        </div>
        <Link
          href="/notes/add/create"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 fixed bottom-16 right-4"
        >
          Add Notes
        </Link>
        {entries.map((entry) => (
          <Notes key={entry.id} {...entry} />
        ))}
      </div>
    </>
  );
}
