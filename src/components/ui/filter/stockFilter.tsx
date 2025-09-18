import React from 'react';

interface StockFilterProps {
  inStockOnly: boolean;
  setInStockOnly: (inStock: boolean) => void;
}

export const StockFilter: React.FC<StockFilterProps> = ({ inStockOnly, setInStockOnly }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="inStockOnly"
        checked={inStockOnly}
        onChange={(e) => setInStockOnly(e.target.checked)}
        className="w-4 h-4 text-majorelle focus:ring-majorelle border-gray-300 rounded"
      />
      <label htmlFor="inStockOnly" className="ml-2 text-sm text-gray-700">
        In Stock Only
      </label>
    </div>
  );
};