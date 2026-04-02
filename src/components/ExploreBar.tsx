import { UtensilsCrossed } from "lucide-react";
import { useState } from "react";
export default function ExploreBar() {
  const [explore, setExplore] = useState("");
  return (
    <div className="my-3 mx-2 flex items-center bg-gray-200 rounded-4xl px-3 py-3 w-160">
      <UtensilsCrossed
        size={28}
        color="#854d0e"
        fill="#854d0e"
        className="cursor-pointer hover:text-orange-500"
      />
      <input
        type="text"
        value={explore}
        onChange={(e) => setExplore(e.target.value)}
        placeholder="Find ingredients, cuisines, or chefs ..."
        className="outline-none border-none text-lg bg-transparent ml-2 w-full"
      />
      <button className="bg-yellow-800 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors duration-300">
        Explore
      </button>
    </div>
  );
}
