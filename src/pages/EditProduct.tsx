// pages/EditProduct.tsx
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
      <div className="flex justify-center items-center gap-2 mt-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-600"
        >
          Back
        </button>
      </div>

    
      <div className="mt-5 flex justify-center">
        <img
          src={formData.thumbnail}
          alt={formData.title}
          className="w-full max-w-3xl h-96 object-cover border rounded-lg"
        />
      </div>

     
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Edit {product.title}</h1>

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

        
          <div className="space-x-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 disabled:bg-green-300"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Product"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
