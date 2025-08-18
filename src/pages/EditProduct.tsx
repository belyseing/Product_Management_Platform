
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useProducts } from "../context/ProductContext";
import type { Product } from "../context/ProductContext";

interface LocationState {
  product: Product;
}

const EditProduct: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateProduct } = useProducts();


  const state = location.state as LocationState | undefined;
  const product = state?.product;

  if (!product) {
    return <div className="text-center mt-10">No product data found</div>;
  }

  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
    category: product.category,
    description: product.description,
    thumbnail: product.thumbnail,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.put(`https://dummyjson.com/products/${product.id}`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      const updatedProduct = res.data;


      updateProduct({ ...product, ...updatedProduct });

      alert("Product updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="w-full pt-6">
  
  <div className="max-w-6xl mx-auto px-4">
    <button
      onClick={() => navigate("/")}
      className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition"
    >
      ← Back to Products
    </button>
  </div>

 
  <div className="bg-white mt-6 rounded-2xl shadow-lg p-6 max-w-6xl mx-auto md:flex md:gap-8">
   
   <div className="md:w-1/2 bg-gray-50 flex items-center justify-center p-6 rounded-2xl">
      <img
      src={product.thumbnail}
      alt={product.title}
      className="max-h-[600px] w-[400px] max-w-full object-contain rounded-xl shadow-md transition-transform duration-300"
      />
     </div>

   
    <div className="md:w-1/2 mt-6 md:mt-0">
      <h1 className="text-3xl font-bold mb-4">Edit {product.title}</h1>

      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows={6}
            required
          ></textarea>
        </div>

        <div className="space-x-4">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded
             transition-all duration-200
             shadow-md hover:shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Product"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</div>


  );
};

export default EditProduct;
