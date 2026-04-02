import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex w-full items-center rounded-4xl bg-gray-100 p-3 sm:w-65">
      <Search
        size={22}
        color="gray"
        className="cursor-pointer hover:text-orange-500"
      />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search recipes..."
        className="ml-2 w-full border-none bg-transparent text-base outline-none"
      />
    </div>
  );
}
