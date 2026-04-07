import { UtensilsCrossed } from "lucide-react";
import { useState } from "react";

type exploreProp = {
  onExplore: (term: string) => void;
};

export default function ExploreBar({ onExplore }: exploreProp) {
  const [explore, setExplore] = useState("");

  const handleExplore = () => {
    onExplore(explore);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExplore(e.target.value);
    onExplore(e.target.value);
  };

  return (
    <div className="my-3 flex w-full max-w-3xl flex-col gap-3 rounded-4xl bg-gray-200 px-3 py-3 sm:flex-row sm:items-center">
      <div className="flex w-full items-center">
        <UtensilsCrossed
          size={24}
          color="#854d0e"
          fill="#854d0e"
          className="cursor-pointer hover:text-orange-500"
        />
        <input
          type="text"
          value={explore}
          onChange={(e) => {handleChange(e)}}
          placeholder="Find ingredients, cuisines, or chefs ..."
          className="ml-2 w-full border-none bg-transparent text-base outline-none"
        />
      </div>
      <button 
      onClick={handleExplore}
      className="w-full rounded-full bg-yellow-800 px-5 py-2 text-white transition-colors duration-300 cursor-pointer hover:bg-orange-800 sm:w-auto"
      >
        Explore
      </button>
    </div>
  );
}
