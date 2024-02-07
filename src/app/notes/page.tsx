import Link from "next/link";
import prisma from "../../../lib/prisma";
import Notes from "./Notes";
import {
  MdAdd,
  MdFavorite,
  MdFlight,
  MdNote,
  MdPerson,
  MdWork,
} from "react-icons/md";

export default async function Home() {
  const entries = await prisma.entry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="container p-4">
        <div className="flex flex-row items-center justify-start text-gray-900 hover:text-white cursor-pointer mb-4">
          <div className="border border-gray-500 p-2">
            <MdNote className="w-8 h-8 mb-2 " />
          </div>
          <span className="text-md ml-3 font-semibold">All Notes</span>
        </div>
        <h2 className="text-lg font-semibold mb-2">Catogries</h2>

        <div className="grid grid-cols-4 gap-4">
          {/* Work */}
          <div className="flex flex-col items-center justify-center text-gray-800 px-4 py-4 flex-1 rounded-md shadow-md bg-green-200 hover:bg-green-400 border border-gray-400">
            <MdWork className="sm:w-8 sn:h-8 w-6 h-6 mb-2" />
            <span className="text-sm">Work</span>
          </div>

          {/* Travel */}
          <div className="flex flex-col items-center justify-center text-gray-800 px-4 py-4 flex-1 rounded-md shadow-md bg-blue-200 hover:bg-blue-400 border border-gray-400">
            <MdFlight className="sm:w-8 sn:h-8 w-6 h-6 mb-2" />
            <span className="text-sm">Travel</span>
          </div>

          {/* Personal */}
          <div className="flex flex-col items-center justify-center text-gray-800 px-4 py-4 flex-1 rounded-md shadow-md bg-yellow-200 hover:bg-yellow-400 border border-gray-400">
            <MdPerson className="sm:w-8 sn:h-8 w-6 h-6 mb-2" />
            <span className="text-sm">Personal</span>
          </div>

          {/* Health */}
          <div className="flex flex-col items-center justify-center text-gray-800 px-4 py-4 flex-1 rounded-md shadow-md bg-red-200 hover:bg-red-400 border border-gray-400">
            <MdFavorite className="sm:w-8 sn:h-8 w-6 h-6 mb-2" />
            <span className="text-sm">Health</span>
          </div>
        </div>
        <Link
          href="/notes/add/create"
          className=" text-gray-800 px-4 py-4 rounded-full shadow-md bg-white hover:bg-blue-600 fixed bottom-16 right-4 border z-10 border-gray-400"
        >
          <MdAdd className="w-6 h-6" />
        </Link>
        {entries.map((entry) => (
          <Notes key={entry.id} {...entry} />
        ))}
      </div>
    </>
  );
}
