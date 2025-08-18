import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {  FaTrash, FaShoppingCart, FaMinus, FaPlus } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
    
       <div className="max-w-6xl mx-auto px-4  mt-6 ">
    <button
      onClick={() => navigate("/")}
      className="px-4 py-2 bg-teal-600 text-white mb-8 rounded hover:bg-teal-700 transition"
    >
      ← Back to Products
    </button>
  </div>

      {cart.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm  border border-gray-100">
          <div className="mx-auto w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center mb-4">
            <FaShoppingCart className="h-12 w-12 text-teal-400" />
          </div>
          <h3 className="text-2xl font-medium text-gray-800 mb-3">Your cart feels lonely</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">Your shopping cart is empty. Let's find something special for you!</p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors duration-200 shadow-md hover:shadow-lg font-medium"
          >
            Discover Products
          </button>
        </div>
      ) : (
        <div className="grid gap-8">
        
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-center gap-6 w-full sm:w-auto">
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center p-2">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm">${item.price.toFixed(2)} each</p>
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150 text-gray-600"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150 text-gray-600"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full sm:w-auto mt-4 sm:mt-0">
                  <span className="font-bold text-lg text-gray-800 min-w-[80px] text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors duration-150"
                  >
                    <FaTrash className="text-sm" />
                    <span className="text-sm font-medium">Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Total ({cart.length} items)</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-teal-600">Free</span>
              </div>
              <div className="border-t border-gray-200 my-3"></div>
              <div className="flex justify-between text-xl font-bold text-gray-800">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button
              className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <FaArrowRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;