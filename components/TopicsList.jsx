import Link from "next/link";
import RemoveBtn from "./Removebtn";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/topics`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
    return { topics: [] }; // Return an empty array if there is an error
  }
};

export default async function TopicsList() {
  const { topics = [] } = await getTopics(); // Default to an empty array if getTopics fails

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {topics.length > 0 ? (
        topics.map((t) => (
          <div
            key={t._id}
            className="p-4 border border-slate-300 rounded-lg shadow-sm my-3 flex justify-between items-start gap-5 bg-white hover:shadow-md transition-shadow duration-300"
          >
            <div>
              <h2 className="font-bold text-xl text-gray-800">{t.title}</h2>
              <p className="text-gray-600 mt-1">{t.description}</p>
            </div>

            <div className="flex justify-center items-center gap-2">
              <RemoveBtn id={t._id} />
              <Link href={`/editTopic/${t._id}`}>
                <HiPencilAlt
                  size={24}
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                  aria-label="Edit Topic"
                />
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No topics found.</p>
      )}
    </div>
  );
}