import { Search } from "lucide-react";
import { useState } from "react";

type searchProp = {
  onSearch: (term: string) => void;
};
export default function SearchBar({ onSearch }: searchProp) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <div className="flex w-full items-center rounded-4xl bg-gray-100 p-3 sm:w-65">
      <Search
        size={22}
        color="gray"
        className="cursor-pointer hover:text-orange-500"
        onClick={handleSearch}
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
