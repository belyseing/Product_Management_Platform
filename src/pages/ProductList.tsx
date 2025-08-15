import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";
import SearchBar from "../components/SearchBar";
import type { Product } from "../context/ProductContext";
import type { Category } from "../types/Product";

const ProductListPage: React.FC = () => {
  const { products } = useProducts(); 
  const [search, setSearch] = useState(""); 
  const [selectedCategory, setSelectedCategory] = useState(""); 

  const categories: Category[] = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  if (!products.length) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <div className="p-6">
      <SearchBar
        value={search}
        onchange={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filteredProducts.length === 0 ? (
        <div className="mt-10 text-center text-gray-500">
          <p className="text-2xl font-semibold mb-2">No products available</p>
          <p className="text-sm">Try searching with different keywords or categories.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
