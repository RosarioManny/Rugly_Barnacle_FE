import React from 'react';

interface PriceFilterProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({ priceRange, setPriceRange }) => {
  return (
    <div className="flex-1 max-w-md">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Price Range: ${priceRange[0]} - ${priceRange[1]}
      </label>
      <input
        type="range"
        min="0"
        max="1000"
        value={priceRange[1]}
        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>$0</span>
        <span>$1000</span>
      </div>
    </div>
  );
};