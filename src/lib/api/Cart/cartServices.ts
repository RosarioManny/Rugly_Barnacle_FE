import api from "../apiConfig"

export interface CartInfo {
  id: number,
  session_key: string,
}
// TODO: getCart - /cart/
// get current cart for user
export const getCart = async () => {
  try {
    const response = await api.get<CartInfo>("cart/");
    return response.data

  } catch(err: any) {
    console.log("Error fetching products:", err.response?.data?.error || err.message);
    throw err
  }
}
// TODO: addToCart - /cart/items/
// TODO: getCartItems - /cart/items/<int:id>/