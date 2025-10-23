import api from "../apiConfig";
import { type Product } from "../Product/productservices";

export interface CartItem {
  id: number;
  product: Product;
  product_id: number;
  product_name: string;
  product_price: string;
  product_images?: {
    primary: string;
  };
  quantity: number;
  added_at: string;
  dimensions?: string;
}

export interface Cart {
  id: number;
  session_key: string;
  items: CartItem[];
  total: string;
  created_at: string;
  updated_at: string;
}

// API Response types
interface AddToCartResponse {
  id: number;
  cart: number;
  product: number;
  quantity: number;
  added_at: string;
}


// Get Cart
export const getCart = async (): Promise<Cart> => {
  try {
    const response = await api.get<Cart>('/cart/');
    console.log("✅ Cart fetched successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Failed to fetch cart:", error.response?.data || error.message);
    throw error;
  }
};

// Add to Cart
export const addToCart = async (
  productId: number, 
  quantity: number = 1
): Promise<AddToCartResponse> => {
  try {
    const response = await api.post<AddToCartResponse>('/cart/add-to-cart/', {
      product_id: productId,
      quantity: quantity
    });
    console.log(`✅ Added ${quantity}x product ${productId} to cart:`, response.data);
    return response.data;
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.message;
    console.error("❌ Failed to add to cart:", errorMsg);
    throw new Error(errorMsg);
  }
};

// Remove from Cart
export const removeFromCart = async (
  productId: number, 
  quantity: number = 1
): Promise<Cart> => {
  try {
    const response = await api.delete<Cart>('/cart/remove-from-cart/', {
      data: {
        product_id: productId,
        quantity: quantity
      }
    });
    console.log(`✅ Removed ${quantity}x product ${productId} from cart:`, response.data);
    return response.data;
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.message;
    console.error("❌ Failed to remove from cart:", errorMsg);
    throw new Error(errorMsg);
  }
};

// Get single cart item (optional - for CartItemDetailView)
export const getCartItem = async (itemId: number): Promise<CartItem> => {
  try {
    const response = await api.get<CartItem>(`/cart/items/${itemId}/`);
    console.log("✅ Cart item fetched:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("❌ Failed to fetch cart item:", error.response?.data || error.message);
    throw error;
  }
};

// Update cart item quantity (optional - for CartItemDetailView PATCH)
export const updateCartItem = async (
  itemId: number, 
  quantity: number
): Promise<CartItem> => {
  try {
    const response = await api.patch<CartItem>(`/cart/items/${itemId}/`, {
      quantity: quantity
    });
    console.log(`✅ Updated cart item ${itemId} to quantity ${quantity}:`, response.data);
    return response.data;
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.message;
    console.error("❌ Failed to update cart item:", errorMsg);
    throw new Error(errorMsg);
  }
};

// Delete cart item completely (optional - for CartItemDetailView DELETE)
export const deleteCartItem = async (itemId: number): Promise<void> => {
  try {
    await api.delete(`/cart/items/${itemId}/`);
    console.log(`✅ Deleted cart item ${itemId}`);
  } catch (error: any) {
    const errorMsg = error.response?.data?.error || error.message;
    console.error("❌ Failed to delete cart item:", errorMsg);
    throw new Error(errorMsg);
  }
};