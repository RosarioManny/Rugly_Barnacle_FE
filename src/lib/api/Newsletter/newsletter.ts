import api from '../apiConfig';

export interface NewsletterSubscription {
  email: string;
  subscribed_at?: string;
  status?: 'subscribed' | 'unsubscribed';
}

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