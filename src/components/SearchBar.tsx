import React from "react";
import { IoSearch } from "react-icons/io5";
import ProductFilter from "./ProductFilter";
import type { Category } from "../types/Product";

type SearchProps = {
  value: string;
  onchange: (value: string) => void;
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

const SearchBar: React.FC<SearchProps> = ({
  value,
  onchange,
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10 px-4">
      
   
      <ProductFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onchange={onCategoryChange}
      />

    
     <div className="relative w-full max-w-lg">
  <input
    type="text"
    placeholder="Search for products..."
    value={value}
    onChange={(e) => onchange(e.target.value)}
    className="w-full rounded-full border border-gray-300 py-3 pl-6 pr-12 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all placeholder-gray-400 hover:border-gray-400 shadow-sm"
  />
  <IoSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
</div>
    </div>
  );
};

export default SearchBar;
