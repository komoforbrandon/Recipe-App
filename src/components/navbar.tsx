import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Heart, UserCircle } from "lucide-react";
import SearchBar from "./searchBar";

export default function NavBar() {
  const navigate = useNavigate();

  const handleSearch = (searchTerm: string) => {
    navigate(`/?q=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <nav className="py-3 max-full mx-auto px-4 sm:px-6">
      <div className="flex flex-col gap-4  bg-white p-1 text-black md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-6 md:gap-10">
          <Link
            to="/"
            className="text-lg md:text-xl font-extrabold hover:text-orange-500 transition-colors duration-300"
          >
            Saffront & Sage
          </Link>
          <Link
            to="/"
            className="text-gray-700 uppercase font-bold hover:text-gray-900 focus:underline focus:text-amber-700 focus:ring-gray-400 focus:underline-offset-7 focus:decoration-3 transition-colors duration-600"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="text-gray-700 uppercase font-bold hover:text-gray-900 focus:underline focus:text-amber-700 focus:ring-gray-400 focus:underline-offset-7 focus:decoration-3 transition-colors duration-600"
          >
            Favorites
          </Link>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 ">
          <i className="hidden md:flex"><SearchBar onSearch={handleSearch} /></i> 
          <div className="flex items-center gap-4">
            <Link to="/favorites" className="hover:text-gray-300 hidden md:inline-flex">
              <Heart size={24} fill="#00023" />
            </Link>
            <Link to="/user" className="hover:text-gray-300 hidden md:inline-flex">
              <UserCircle size={24} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
