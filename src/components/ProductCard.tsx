import React from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import type { Product } from "../context/ProductContext";
import { FaEdit, FaShoppingCart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { deleteProduct } = useProducts();

  const handleEdit = () => navigate(`/edit/${product.id}`, { state: { product } });
  const handleDelete = () => {
    if (window.confirm("Permanently delete this product?")) {
      deleteProduct(product.id);
      alert("Product deleted!");
    }
  };
  const handleView = () => navigate(`/product/${product.id}`, { state: { product } });

  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart(product.id);
  };

  const { cart} = useCart();

const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl duration-300 ease-in-out hover:bg-white transition-all transform hover:-translate-y-1">
     <div className="relative overflow-hidden h-60 w-full bg-gray-100 flex items-center justify-center">
  <img 
    src={product.thumbnail} 
    alt={product.title} 
    className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
  />
  

  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-transparent" />
  

  <div className="absolute top-3 right-3 flex items-center bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-amber-600 shadow-md">
    <span className="mr-1">⭐</span>
    <span>{product.rating?.toFixed(1) || '4.5'}/5</span>
  </div>

</div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">{product.title}</h3>
            <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-600 border border-indigo-100">
              {product.category}
            </span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toLocaleString()}
            {product.discountPercentage && (
              <span className="block text-xs font-normal text-gray-500 line-through">
                ${(product.price * (1 + product.discountPercentage/100)).toFixed(2)}
              </span>
            )}
          </span>
        </div>

        <p className="mt-3 text-gray-600 text-sm line-clamp-2">{product.description}</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="grid grid-cols-3 gap-2 col-span-2">
            <button
              onClick={handleView}
              className="relative overflow-hidden group/view border border-indigo-100 bg-indigo-50 text-indigo-600 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md flex items-center justify-center gap-1.5 hover:bg-indigo-100 hover:text-indigo-700"
            >
              <span className="relative z-10 flex items-center">
                <FaEye className="text-current"/>
                <span className="ml-2">View</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-indigo-200 opacity-0 group-hover/view:opacity-100 transition-opacity duration-300 rounded-lg"></span>
            </button>
            
            <button
              onClick={handleEdit}
              className="relative overflow-hidden group/edit border border-emerald-100 bg-emerald-50 text-emerald-600 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md flex items-center justify-center gap-1.5 hover:bg-emerald-100 hover:text-emerald-700"
            >
              <span className="relative z-10 flex items-center">
                <FaEdit className="text-current"/>
                <span className="ml-2">Edit</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-emerald-200 opacity-0 group-hover/edit:opacity-100 transition-opacity duration-300 rounded-lg"></span>
            </button>
            
            <button
              onClick={handleDelete}
              className="relative overflow-hidden group/delete border border-rose-100 bg-rose-50 text-rose-600 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md flex items-center justify-center gap-1.5 hover:bg-rose-100 hover:text-rose-700"
            >
              <span className="relative z-10 flex items-center">
                <RiDeleteBinLine className="text-current"/>
                <span className="ml-2">Delete</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-rose-100 to-rose-200 opacity-0 group-hover/delete:opacity-100 transition-opacity duration-300 rounded-lg"></span>
            </button>
          </div>
                 <button
  onClick={handleAddToCart}
  disabled={isInCart}
  className={`col-span-2 relative overflow-hidden text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 shadow-md flex items-center justify-center gap-2
    ${
      isInCart
       ? "bg-red-500  shadow-inner cursor-default" 
    : "bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white shadow-md"
    }`}
>
  <span className="relative z-10 flex items-center">
    <FaShoppingCart className="text-white"/>
    <span className="ml-2">{isInCart ? "Added to Cart" : "Add to Cart"}</span>
  </span>

  {!isInCart && (
    <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-700 opacity-0 group-hover/cart:opacity-100 transition-opacity duration-300 rounded-lg"></span>
  )}

  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold bg-white/20 px-2 py-1 rounded-full">
    ${product.price.toLocaleString()}
  </span>
</button>


        </div>
      </div>
    </div>
  );
};

export default ProductCard;