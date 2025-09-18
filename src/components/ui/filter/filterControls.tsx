import React from 'react';
import { SearchBar } from './searchBar';
import { CategoryFilter } from './categoryFilter';
import { PriceFilter } from './priceFilter';
import { SortDropdown } from './sortDropdown';
import { StockFilter } from './stockFilter';
import type { FilterFunctions, FilterState } from '../../../lib/utils/filter/types';

interface FilterControlsProps {
  filterState: FilterState;
  filterFunctions: FilterFunctions;
  productCount: number;
  filteredCount: number;
  categories: string[];
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filterState,
  filterFunctions,
  productCount,
  filteredCount,
  categories
}) => {
  return (
    <>
      {/* Search Bar Section */}
      <section className="p-4 bg-white sticky top-0 z-10 shadow-md">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <SearchBar
            searchTerm={filterState.searchTerm}
            setSearchTerm={filterFunctions.setSearchTerm}
          />
          
          <div className="flex items-center gap-4">
            <StockFilter
              inStockOnly={filterState.inStockOnly}
              setInStockOnly={filterFunctions.setInStockOnly}
            />
            
            <button
              onClick={filterFunctions.clearAllFilters}
              className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              aria-label="Clear all filters"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <CategoryFilter
            categories={categories}
            selectedCategory={filterState.selectedCategory}
            setSelectedCategory={filterFunctions.setSelectedCategory}
          />
        </div>
      </section>

      {/* Filter and Sort Controls Section */}
      <section className="bg-white py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <PriceFilter
              priceRange={filterState.priceRange}
              setPriceRange={filterFunctions.setPriceRange}
            />
            
            <SortDropdown
              sortBy={filterState.sortBy}
              setSortBy={filterFunctions.setSortBy}
            />
            
            <div className="text-sm text-gray-600 min-w-[100px] text-center">
              Showing {filteredCount} of {productCount} items
            </div>
          </div>
        </div>
      </section>
    </>
  );
};