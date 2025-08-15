import React from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import type { Product } from "../context/ProductContext";

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

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
    
      <div className="relative overflow-hidden h-60">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
       
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-amber-600 shadow-sm">
          ⭐ {product.rating || 4.5}/5
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

       
        <div className="mt-6 grid grid-cols-3 gap-2">
          
          <button
            onClick={handleView}
            className="relative overflow-hidden group/btn bg-gradient-to-br from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
          >
            <span className="relative z-10 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>View</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-lg"></span>
          </button>
          
          
          <button
            onClick={handleEdit}
            className="relative overflow-hidden group/btn bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
          >
            <span className="relative z-10 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-lg"></span>
          </button>
          
          
          <button
            onClick={handleDelete}
            className="relative overflow-hidden group/btn bg-gradient-to-br from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-1.5"
          >
            <span className="relative z-10 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Delete</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-lg"></span>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ProductCard;