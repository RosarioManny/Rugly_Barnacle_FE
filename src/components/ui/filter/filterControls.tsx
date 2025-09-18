import React from 'react';
import { SearchBar } from './searchBar';
import { CategoryFilter } from './categoryFilter';
import { SortDropdown } from './sortDropdown';
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
      <section className="p-4 bg-fleece sticky top-0 z-10">
        <div className="flex md:flex-row gap-4 items-center justify-center">
          <SearchBar
            searchTerm={filterState.searchTerm}
            setSearchTerm={filterFunctions.setSearchTerm}
          />
          <button
              onClick={filterFunctions.clearAllFilters}
              className="px-3 py-1 text-sm text-space_cadet bg-gray-200 hover:bg-bittersweet/50 rounded-md transition-colors"
              aria-label="Clear all filters"
            >
              Clear Filters
            </button>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="bg-pink-200 py-4 flex justify-center overflow-x-auto scrollbar-hide">
        <div className=" mx-auto px-4">
          <CategoryFilter
            categories={categories}
            selectedCategory={filterState.selectedCategory}
            setSelectedCategory={filterFunctions.setSelectedCategory}
          />
        </div>
      </section>

      {/* Filter and Sort Controls Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-6">
            
            <SortDropdown
              sortBy={filterState.sortBy}
              setSortBy={filterFunctions.setSortBy}
            />
            
            <div className="text-sm text-space_cadet/60 min-w-[50px] text-center">
              {filteredCount} of {productCount} items
            </div>
          </div>
        </div>
      </section>
    </>
  );
};