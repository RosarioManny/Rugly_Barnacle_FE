import React from 'react';

interface SortDropdownProps {
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ sortBy, setSortBy }) => {
  return (
    <div className="min-w-[200px]">
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-majorelle focus:border-transparent"
        aria-label="Sort products"
      >
        <option value="featured">Featured</option>
        <option value="price-low-high">Price: Low to High</option>
        <option value="price-high-low">Price: High to Low</option>
        <option value="name-a-z">Name: A to Z</option>
        <option value="name-z-a">Name: Z to A</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
};