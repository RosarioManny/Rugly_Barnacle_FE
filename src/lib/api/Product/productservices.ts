import api from '../apiConfig.ts';

export interface Property {
  id: number;
  name: string;
  display_name: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  description: string;
  dimensions: string;
  quantity: number;
  properties: Property[];
  created_at?: string;
  updated_at?: string;
}

// Get list of Products
const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>('products/')
    return response.data
  }
  catch (err: any) {
    console.log("Error fetching products:", err.response?.data?.error || err.message);
    throw err
  };
}
// Get a single product by ID
const getProduct = async(id: number): Promise<Product> => {
  try {
    const response = await api.get<Product>(`/products/${id}/`);
    return response.data;
  }
  catch (err: any) {
    console.log("Error fetching product:", err.response?.data?.error || err.message);
    throw err
  };
}

// Get all products by CATEGORY
const getProductsByCategory = async (categorySlug: string): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>('/products/', {
      params: { category: categorySlug }
    });
    return response.data;
  } catch (err: any) {
    console.log('Error fetching products by category:', err.response?.data?.error || err.message);
    throw err;
  }
}

// Get all product Images
// const getProductImages = async (): Promise<Product> => {
//   try {
//     const response = await api.get()
//   }
// }
export { getProducts, getProduct, getProductsByCategory }