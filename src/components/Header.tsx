import { SiCoinmarketcap } from "react-icons/si";
import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


function Header() {
  const { cart } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          
         
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="p-2 bg-teal-300 rounded-lg">
              <SiCoinmarketcap className="text-2xl text-teal-700" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 hover:text-teal-600 transition-colors duration-300">
              QuickPick
            </h1>
          </div>

         
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-teal-600 rounded-full transition-colors duration-300">
              <FiSearch className="text-xl" />
            </button>
            <button className="p-2 text-gray-600 hover:text-red-500 rounded-full transition-colors duration-300">
              <FiHeart className="text-xl" />
            </button>
             <button
            onClick={() => navigate("/CartPage")}
              className="p-2 text-gray-600 hover:text-teal-600 rounded-full transition-colors duration-300 relative"
            >
              <FiShoppingCart className="text-xl" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
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
