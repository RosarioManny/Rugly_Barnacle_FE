import api from '../apiConfig.ts';

export interface CheckoutSessionResponse {
  id: string,
  subtotal: number,
  total: number,
  tax: number,
  shipping: number,
  currency: string,
  customer_details?: string,
}
export const createCheckout = async () => {
  try {
    const response = await api.post('create-checkout-session/');
    return response.data
  } catch (err: any) {
    console.log("Error fetching session:", err.response?.data?.error || err.message);
    throw err 
  }
}

export const checkoutSuccess = async (sessionId: string, cartId: string) => {
  try {
    const response = await api.post('checkout-success/', {
      session_id: sessionId,
      cart_id: cartId
    });
    return response.data
  } catch (err: any) {
    console.log("Error fetching session:", err.response?.data?.error || err.message);
    throw err
  }
}