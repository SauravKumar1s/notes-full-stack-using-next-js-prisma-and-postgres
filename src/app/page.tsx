import Link from "next/link";
import prisma from "../../lib/prisma";
import Notes from "./notes/Notes";
import Login from "@/components/Form/Login";

export default async function Home() {
  const entries = await prisma.entry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      {/* <div className="container p-4">
        <Link
          href="/notes/add/create"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Notes
        </Link>
        {entries.map((entry) => (
          <Notes key={entry.id} {...entry} />
        ))}
      </div> */}
     <Login/>

    </>
  );
}
