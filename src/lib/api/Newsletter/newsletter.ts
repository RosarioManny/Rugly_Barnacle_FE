import api from '../apiConfig';

export interface NewsletterSubscription {
  email: string;
  subscribed_at?: string;
  status?: 'subscribed' | 'unsubscribed';
}

  // path('newsletter/subscribe/', NewsletterSubscribeView.as_view(), name='newsletter-subscribe'),
  // path('newsletter/unsubscribe/', NewsletterUnsubscribeView.as_view(), name='newsletter-unsubscribe'),
export const subscribeToNewsletter = async (email: string): Promise<NewsletterSubscription> => {
  try {
    const response = await api.post<NewsletterSubscription>('/newsletter/subscribe/', { email });
    return response.data;
  } catch (err: any) {
    console.error("Error subscribing to newsletter:", err.response?.data?.error || err.message);
    throw err;
  }
}

export const unsubscribeFromNewsletter = async (email: string): Promise<NewsletterSubscription> => {
  try {
    const response = await api.post<NewsletterSubscription>('/newsletter/unsubscribe/', { email });
    return response.data;
  } catch (err: any) {
    console.error("Error unsubscribing from newsletter:", err.response?.data?.error || err.message);
    throw err;
  }
}

// export  const createCustomOrder = async (orderData: CustomOrderData) => {
//   try { 
//     const formData = new FormData()

//     formData.append('customer_name', orderData.customer_name);
//     formData.append('description', orderData.description);
//     formData.append('email', orderData.email);
//     formData.append('contact_method', orderData.contact_method);
//     formData.append('contact_info', orderData.contact_info);

//     if (orderData.image) {
//       formData.append('images', orderData.image)
//     }
    
//     const response = await api.post<CustomOrderResponse>('/custom/', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       }
//     });

//     return response.data
//   } catch(err: any) {
//     console.error("Error creating custom order:", err.response?.data.err || err.message);
//     throw err
//   }
// }