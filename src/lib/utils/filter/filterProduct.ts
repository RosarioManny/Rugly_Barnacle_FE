import type { Product } from '../../api/Product/productservices';
import type { FilterState } from './types';

export const filterProducts = (products: Product[], filters: FilterState): Product[] => {
  let filtered = [...products];

  // Category filter
  if (filters.selectedCategory !== 'all') {
    filtered = filtered.filter(product => 
      product.category.name === filters.selectedCategory
    );
  }

  // Search filter
  if (filters.searchTerm) {
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
    );
  }

  // Price range filter
  // filtered = filtered.filter(product => {
  //   const price = parseFloat(product.price.toString());
  //   return price >= filters.priceRange[0] && price <= filters.priceRange[1];
  // });

  // Stock filter
  // if (filters.inStockOnly) {
  //   filtered = filtered.filter(product => product.quantity > 0);
  // }

  return filtered;
};