import { useState, useCallback, useMemo } from 'react';
import type { Product } from '../../lib/api/Product/productservices';
import type { FilterState, UseProductFiltersReturn } from '../../lib/utils/filter/types';
import { filterProducts } from '../../lib/utils/filter/filterProduct';
import { sortProducts } from '../../lib/utils/filter/sortProduct';

export const useProductFilters = (products: Product[]): UseProductFiltersReturn => {
  const [filterState, setFilterState] = useState<FilterState>({
    selectedCategory: 'all',
    sortBy: 'featured',
    searchTerm: '',
    // priceRange: [0, 1000],
    // inStockOnly: false,
  });

  const filteredProducts = useMemo(() => {
    const filtered = filterProducts(products, filterState);
    return sortProducts(filtered, filterState.sortBy);
  }, [products, filterState]);

  // CATEGORY
  const setSelectedCategory = useCallback((category: string) => {
    setFilterState(prev => ({ ...prev, selectedCategory: category }));
  }, []);

  // SORTING ITEMS
  const setSortBy = useCallback((sortBy: string) => {
    setFilterState(prev => ({ ...prev, sortBy }));
  }, []);
  
  // SEARCH BAR
  const setSearchTerm = useCallback((term: string) => {
    setFilterState(prev => ({ ...prev, searchTerm: term }));
  }, []);

  // PRICE 
  // const setPriceRange = useCallback((range: [number, number]) => {
  //   setFilterState(prev => ({ ...prev, priceRange: range }));
  // }, []);

  // STOCK
  // const setInStockOnly = useCallback((inStock: boolean) => {
  //   setFilterState(prev => ({ ...prev, inStockOnly: inStock }));
  // }, []);

  const clearAllFilters = useCallback(() => {
    setFilterState({
      selectedCategory: 'all',
      sortBy: 'featured',
      searchTerm: '',
      // priceRange: [0, 1000],
      // inStockOnly: false,
    });
  }, []);

  const filterFunctions = {
    setSelectedCategory,
    setSortBy,
    setSearchTerm,
    clearAllFilters,
    // setPriceRange,
    // setInStockOnly,
  };

  return {
    filteredProducts,
    filterState,
    filterFunctions,
    productCount: products.length,
    filteredCount: filteredProducts.length,
  };
};