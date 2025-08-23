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
const getProduct = async (id: number): Promise<Product> => {
  try {
    console.log("🔄 Making API request to:", `/products/${id}/`);
    
    const response = await api.get<Product>(`/products/${id}/`);
    
    console.log("✅ API response received. Status:", response.status);
    console.log("📦 Response data:", response.data);
    
    return response.data;
  } catch (err: any) {
    console.error("❌ API Error occurred:");
    
    // Detailed error logging
    if (err.response) {
      // The request was made and the server responded with a status code
      console.error("📡 Response error:", err.response.status, err.response.statusText);
      console.error("📝 Error data:", err.response.data);
      console.error("🔗 URL:", err.config?.url);
      console.error("⚡ Method:", err.config?.method);
    } else if (err.request) {
      // The request was made but no response was received
      console.error("🚫 No response received:", err.request);
      console.error("🌐 Is the server running?");
    } else {
      // Something happened in setting up the request
      console.error("⚙️ Setup error:", err.message);
    }
    
    console.error("🔍 Full error object:", err);
    
    throw new Error(`Failed to fetch product: ${err.response?.data?.error || err.message}`);
  }
};

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

export { getProducts, getProduct, getProductsByCategory }