import RemoveBtn from "./Removebtn";
import { HiPencilAlt } from "react-icons/hi";
import Link from "next/link";

const getTopics = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/topics', {
      cache: "no-store"
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    const data = await res.json();
    return data; // Return the raw response data
  } catch (error) {
    console.log("Error loading topics:", error);
    return { topics: [] }; // Return empty topics array if an error occurs
  }
};

export default async function TopicsList() {
  const { topics } = await getTopics();  // topics will always be an array now

  // If topics is empty, you could display a message like this:
  if (topics.length === 0) {
    return <p>No topics available</p>;
  }

  return (
    <div className="space-y-6">
      {topics.map(t => (
        <div key={t._id} className="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center hover:shadow-xl transition-shadow duration-300">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800">{t.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{t.description}</p>
          </div>
          <div className="flex gap-4">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`} className="text-blue-600 hover:text-blue-800">
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
