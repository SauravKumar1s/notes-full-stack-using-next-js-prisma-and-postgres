import Link from "next/link";
import prisma from "../../../lib/prisma";
import Notes from "./Notes";
import Categories from "@/components/Categories";
import { cookies } from "next/headers";
import axios from "@/lib/axios";
import {
  MdAdd,
  MdFavorite,
  MdFlight,
  MdNote,
  MdPerson,
  MdWork,
} from "react-icons/md";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function Home() {
  const cookie = cookies().get("token");
  const response = await axios("/api/notes", {
    headers: {
      Cookie: `${cookie?.name}=${cookie?.value}`,
    },
  });
 
  return (
    <>
      <div className="container p-4">
        <div className="flex flex-row justify-between items-center text-gray-900  cursor-pointer mb-4">
          <div className="flex gap-4 text-md ml-3 font-semibold">
            <div className="border border-gray-500 p-2">
              {/* <MdNote className="w-8 h-8 mb-2 " /> */}
            </div>{" "}
            All Notes
          </div>
          <div>
          <LogoutButton/>
          </div>
        </div>
        <h2 className="text-lg font-semibold mb-2">Catogries</h2>

        <Categories entries={response.data.entries} />
        <Link
          href="/notes/add/create"
          className=" text-gray-800 px-4 py-4 rounded-full shadow-md bg-white hover:bg-blue-600 fixed bottom-16 right-4 border z-10 border-gray-400"
        >
          <MdAdd className="w-4 h-4" />
        </Link>
        {/* {response.data.entries?.map((entry) => (
          <Notes key={entry.id} {...entry} />
        ))} */}
      </div>
    </>
  );
}
