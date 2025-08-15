import { SiCoinmarketcap } from "react-icons/si";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";

function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="p-2 bg-teal-100 rounded-lg">
              <SiCoinmarketcap className="text-2xl text-teal-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 hover:text-teal-600 transition-colors duration-300">
              QuickPick
            </h1>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-teal-600 rounded-full transition-colors duration-300">
              <FiSearch className="text-xl" />
            </button>
            <button className="p-2 text-gray-600 hover:text-red-500 rounded-full transition-colors duration-300">
              <FiHeart className="text-xl" />
            </button>
            <button className="p-2 text-gray-600 hover:text-teal-600 rounded-full transition-colors duration-300 relative">
              <FiShoppingCart className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white font-bold rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            <button className="p-2 text-gray-600 hover:text-indigo-500 rounded-full transition-colors duration-300">
              <FiUser className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
