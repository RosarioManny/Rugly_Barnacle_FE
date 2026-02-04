import api from "../apiConfig";

export interface Property {
  id: number;
  name: string;
  display_name: string;
}

export const getProperties = async (): Promise<Property[]> => {
  try {
    const response = await api.get<Property[]>('/properties/');
    return response.data;
  } catch (err: any) {
    console.error("Error fetching properties:", err.response?.data?.error || err.message);
    throw err;
  }
}

