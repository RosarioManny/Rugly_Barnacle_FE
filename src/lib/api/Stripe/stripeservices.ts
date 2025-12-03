import api from '../apiConfig.ts';

export const createCheckout = async () => {
  try {
    const response = await api.post('create-checkout-session/');
    return response.data
  } catch (err: any) {
    console.log("Error fetching session:", err.response?.data?.error || err.message);
    throw err 
  }
}
