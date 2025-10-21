import type { Product } from "../../api/Product/productservices";

export interface FilterState {
  selectedCategory: string;
  sortBy: string;
  searchTerm: string;
  // priceRange: [number, number];
  // inStockOnly: boolean;
}

export interface FilterFunctions {
  setSelectedCategory: (category: string) => void;
  setSortBy: (sortBy: string) => void;
  setSearchTerm: (term: string) => void;
  clearAllFilters: () => void;
  // setInStockOnly: (inStock: boolean) => void;
  // setPriceRange: (range: [number, number]) => void;
}

export interface UseProductFiltersReturn {
  filteredProducts: Product[];
  filterState: FilterState;
  filterFunctions: FilterFunctions;
  productCount: number;
  filteredCount: number;
}