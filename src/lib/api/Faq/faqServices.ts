import api from "../apiConfig";

export interface FaqResponse {
  question: string,
  answer: string,
  id?: number
}

export const getAllFaq = async (): Promise<FaqResponse[]> => {
  try {
    const response = await api.get<FaqResponse[]>(`/faq/`);
    return response.data
  } catch(err: any) {
    console.error("Error fetching FAQs:", err.response?.data.err || err.message);
    throw err
  }
}