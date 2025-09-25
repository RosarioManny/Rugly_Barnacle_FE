import api from "../apiConfig";

export interface CustomOrderData {
  customer_name: string,
  description: string,
  email: string,
}
export interface CustomOrderResponse {
  customer_name: string,
  description: string,
  email: string,
  reference_id: string,
  created_at: string,
  status: string,
  admin_notes: string,
}

export const getCustomOrder = async (referenceId: string) => {
  try {
    const response = await api.get<CustomOrderData>(`/custom/${referenceId}`);

    return response.data
  } catch(err: any) {
    console.error("Error fetching custom order:", err.response?.data.err || err.message);
    throw err
  }
}

export  const createCustomOrder = async (orderData: CustomOrderData) => {
  try { 
    const response = await api.post<CustomOrderResponse>('/custom/', orderData);

    return response.data
  } catch(err: any) {
    console.error("Error creating custom order:", err.response?.data.err || err.message);
    throw err
  }
}