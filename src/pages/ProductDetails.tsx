import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Product } from "../context/ProductContext";

const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state as { product: Product } || {};

  if (!product) {
    return <div className="text-center mt-20 text-xl text-gray-600">No product data found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
    
       <button
          onClick={() => navigate("/productList")}
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
        >
          ← Back to Products
        </button>

     
      <div className="bg-white mt-10 rounded-2xl shadow-lg p-6 md:flex md:gap-8">
       
      <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-6 rounded-2xl">
      <img
      src={product.thumbnail}
      alt={product.title}
      className="max-h-[600px] w-[400px] max-w-full object-contain rounded-xl shadow-md transition-transform duration-300"
      />
     </div>

       
        <div className="md:w-1/2 mt-6 md:mt-0 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gray-900">{product.title}</h1>
            <p className="text-gray-700 capitalize mb-4 text-lg">{product.category}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
          </div>

         
          <div className="grid grid-cols-2 gap-4 text-gray-700 mt-4">
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <p className="text-sm">Price</p>
              <p className="text-lg font-bold">${product.price}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <p className="text-sm">Rating</p>
              <p className="text-lg font-semibold">{product.rating} ⭐</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <p className="text-sm">Discount</p>
              <p className="text-lg font-semibold">{product.discountPercentage}%</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <p className="text-sm">Stock</p>
              <p className="text-lg font-semibold">{product.stock}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow col-span-2">
              <p className="text-sm">Shipping Info</p>
              <p className="text-lg font-semibold">{product.shippingInformation}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <p className="text-sm">Availability</p>
              <p className="text-lg font-semibold">{product.availabilityStatus}</p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <p className="text-sm">Date Added</p>
              <p className="text-lg font-semibold">{new Date(product.date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>



    </div>
  );
};

export default ProductDetails;
