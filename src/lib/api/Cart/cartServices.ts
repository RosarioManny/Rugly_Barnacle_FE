import api from "../apiConfig"

export interface CartItem {
  id: number;
  product: number;
  product_name: string;
  product_price: string;
  quantity: number;
  subtotal: number;
  added_at?: string;
  dimensions: string;
}

export interface CartInfo {
  id: number;
  session_key: string;
  created_at: string;
  updated_at: string;
  items: CartItem[]; // Array of CartItem objects
  total: number;
  item_count: number;
}

// get current cart for user
export const getCart = async () => {
  try {
    const response = await api.get<CartInfo>("/cart/");
    console.log(document.cookie)
    return response.data

  } catch(err: any) {
    console.log("Error fetching products:", err.response?.data?.error || err.message);
    throw err
  }
}

export const addToCart = async (  product_id: number, quantity: number = 1 ) => {
  try {
    // console.log('CSRF Token from cookie:', document.cookie);
    
    const response = await api.post("/cart/add-to-cart/", {
      product_id,
      quantity
    });
    
    console.log("Item added to cart!", response.data);
    return response.data;
  } catch(err) {
    // console.log("Full error:", err);
    // console.log("Error response:", err.response);
    // console.log("Error headers:", err.response?.headers);
    throw err;
  }
}

export const removeFromCart = async (product_id: number, quantity: number = 1): Promise<CartInfo> => {
  try {
    const response = await api.delete("/cart/remove-from-cart/", {
      data: {
        product_id,
        quantity
      }
    });

    console.log("Item removed from cart!", response.data);
    return response.data;
  } catch(err) {
    console.error("Error removing item from cart", err)
    throw err
  }
}
// TODO: getCartItems - /cart/items/<int:id>/