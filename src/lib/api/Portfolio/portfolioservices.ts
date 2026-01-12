import api from '../apiConfig';

export interface PortfolioImage {
  title: string;
  image: string;
  is_visible: boolean;
  created_at?: string;
  thumbnail?: string;
}

// GET PORTFOLIO LIST IMAGES
export const getPortfolioImages = async (): Promise<PortfolioImage[]> => {
  try {
    const response = await api.get<PortfolioImage[]>('portfolio/');
    return response.data;

  } catch (err: any) {
    console.error("Error fetching portfolio images:", err.response?.data?.error || err.message);
    throw err;
  }
}