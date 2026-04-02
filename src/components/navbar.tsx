import { Link } from "react-router-dom";
import { Heart, UserCircle, MenuIcon } from "lucide-react";
import SearchBar from "./searchBar";

export default function NavBar() {
  return (
    <nav className="bg-white text-black p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-lg font-extrabold hover:text-orange-500 transition-colors duration-300">
            Saffront & Sage
          </Link>
          <Link to="/" className="text-4xs font-medium text-gray-600 hover:text-orange-500 transition-colors duration-300 hover:underline hover:underline-offset-4">
            Home
          </Link>
          <Link to="/favorites" className="text-4xs font-medium text-gray-600 hover:text-orange-500 transition-colors duration-300 hover:underline hover:underline-offset-4">
            Favorites
          </Link>
        </div>

        <div className="flex items-center space-x-4">   
         <SearchBar />
          <Link to="/favorites" className="hover:text-gray-300">
            <Heart size={24} fill="#00023" />
          </Link>
          <Link to="/user" className="hover:text-gray-300">
            <UserCircle size={24} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
