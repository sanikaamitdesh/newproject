export const dynamic = "force-dynamic"; // Ensures the page is rendered dynamically at runtime

import Link from "next/link";
import RemoveBtn from "./Removebtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/topics`;

  try {
    const res = await fetch(apiUrl, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return await res.json();
  } catch (error) {
    console.error("Error loading topics:", error);
    return { topics: [] }; // Return default structure to prevent errors
  }
};

export default async function TopicsList() {
  const { topics } = await getTopics();

  return (
    <>
      {topics.length === 0 ? (
        <div>No topics available.</div>
      ) : (
        topics.map((t) => (
          <div
            key={t._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
          >
            <div>
              <h2 className="font-bold text-2xl">{t.title}</h2>
              <div>{t.description}</div>
            </div>

            <div className="flex gap-2">
              <RemoveBtn id={t._id} />
              <Link href={`/editTopic/${t._id}`}>
                <HiPencilAlt size={24} />
              </Link>
            </div>
          </div>
        ))
      )}
    </>
  );
}
