import type { Product } from "../../api/Product/productservices";

export interface FilterState {
  selectedCategory: string;
  sortBy: string;
  priceRange: [number, number];
  searchTerm: string;
  inStockOnly: boolean;
}

export interface FilterFunctions {
  setSelectedCategory: (category: string) => void;
  setSortBy: (sortBy: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSearchTerm: (term: string) => void;
  setInStockOnly: (inStock: boolean) => void;
  clearAllFilters: () => void;
}

export interface UseProductFiltersReturn {
  filteredProducts: Product[];
  filterState: FilterState;
  filterFunctions: FilterFunctions;
  productCount: number;
  filteredCount: number;
}