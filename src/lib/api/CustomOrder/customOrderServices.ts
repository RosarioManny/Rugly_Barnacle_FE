import api from "../apiConfig";

export interface CustomOrderData {
  customer_name: string,
  description: string,
  email: string,
  contact_method: string,
  contact_info: string,
  image?: File,
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
    const cleanedReferenceId = referenceId.trim()
    const response = await api.get<CustomOrderResponse>(`/custom/${cleanedReferenceId}/`);

    return response.data
  } catch(err: any) {
    console.error("Error fetching custom order:", err.response?.data.err || err.message);
    throw err
  }
}

export  const createCustomOrder = async (orderData: CustomOrderData) => {
  try { 
    const formData = new FormData()

    formData.append('customer_name', orderData.customer_name);
    formData.append('description', orderData.description);
    formData.append('email', orderData.email);
    formData.append('contact_method', orderData.contact_method);
    formData.append('contact_info', orderData.contact_info);

    if (orderData.image) {
      formData.append('image', orderData.image)
    }
    
    const response = await api.post<CustomOrderResponse>('/custom/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    return response.data
  } catch(err: any) {
    console.error("Error creating custom order:", err.response?.data.err || err.message);
    throw err
  }
}