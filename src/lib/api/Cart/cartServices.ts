import api from "../apiConfig"

export interface CartInfo {
  id: number,
  session_key: string,
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
    console.log('CSRF Token from cookie:', document.cookie);
    
    const response = await api.post("/cart/add-to-cart/", {
      product_id,
      quantity
    });
    
    console.log("Item added to cart!", response.data);
    return response.data;
  } catch(err) {
    console.log("Full error:", err);
    console.log("Error response:", err.response);
    console.log("Error headers:", err.response?.headers);
    throw err;
  }
}
// TODO: getCartItems - /cart/items/<int:id>/