import api from "../apiConfig";
import type { Poll } from "./pollServices"

// Newsletter Object
export interface Newsletter {
  id: number
  title: string
  tags: string
  content: string
  image: string | null
  created_at: string
  quick_description: string | null
  links: Array<{
    title: string
    url: string
  }>
  poll?: Poll | null  // <- add this
}

// Get a list of blogs
export const getNewsletter = async (): Promise<Newsletter[]> => {
  try {
    const response = await api.get<Newsletter[]>('newsletter/');
    return response.data
  }
  catch(err: any) {
    console.error("Error fetching newsletter:", err.response?.data?.error || err.message )
    throw err
  }

}
// Get a specific blog

export const getNewsletterDetails = async ( NewsletterId: number ): Promise<Newsletter> => {
  try {
    const response = await api.get<Newsletter>(`newsletter/${NewsletterId}/`);
    return response.data
  }
  catch(err: any) {
    console.error("Error fetching newsletter details:", err.response?.data?.error || err.message )
    throw err
  }
}