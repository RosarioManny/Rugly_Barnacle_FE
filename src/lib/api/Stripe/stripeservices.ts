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

// export const getCheckoutSession = async (sessionId: string): Promise<CheckoutSessionResponse> => { 
//   try {
//     const response = await api.get(`get-checkout-session/?session_id=${sessionId}`);
//     const sessionData = response.data
    
//     const subtotal = sessionData.amount_subtotal / 100;
//     const total = sessionData.amount_total / 100;
//     const tax = sessionData.total_details?.amount_tax / 100 || 0;
//     const shipping = sessionData.total_details?.amount_shipping / 100 || 0;
//     return {
//       id: sessionData.id,
//       subtotal,
//       total,
//       tax,
//       shipping,
//       currency: sessionData.currency,
//       customer_details: sessionData.customer_details || null,
//     }
//   } catch (err: any) {
//     console.log("Error fetching session:", err.response?.data?.error || err.message);
//     throw err 
//   }
// }