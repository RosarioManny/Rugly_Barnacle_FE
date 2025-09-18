import type { Product } from "../../api/Product/productservices";

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low-high':
      return sorted.sort((a, b) => parseFloat(a.price.toString()) - parseFloat(b.price.toString()));
    case 'price-high-low':
      return sorted.sort((a, b) => parseFloat(b.price.toString()) - parseFloat(a.price.toString()));
    case 'name-a-z':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-z-a':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'newest':
      return sorted.sort((a, b) => 
        new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      );
    case 'oldest':
      return sorted.sort((a, b) => 
        new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime()
      );
    default: // 'featured'
      return sorted;
  }
};