import React from "react";

type ProductFilterProps = {
  categories: string[];
  selectedCategory: string;
  onchange: (category: string) => void;
};

const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  selectedCategory,
  onchange,
}) => {
  return (
    <div className="bg-white shadow-md rounded-full border border-gray-200 px-4 py-2 text-gray-700 transition-all hover:shadow-lg">
      <select
        value={selectedCategory}
        onChange={(e) => onchange(e.target.value)}
        className="bg-transparent outline-none text-sm cursor-pointer"
      >
        <option value="">All Categories</option>
        {categories?.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductFilter;
