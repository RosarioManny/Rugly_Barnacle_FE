import api from "../apiConfig";

// Event Object
export interface Event {
  id: number,
  title: string,
  created_at: string,
  location: string,
  ticket_link?: string | null,
  description: string,
  start_time: string, 
  end_time?: string | null, 
  registration_deadline?: string | null,
  status: 'upcoming' | 'past' | 'cancelled' | 'ongoing',
  price?: number | null,
  event_type: 'online' | 'workshop' | 'meet-up' | 'venue' | 'market'
  image?: string | null
}

// Get a list of blogs
export const getEvents = async (): Promise<Event[]> => {
  try {
    const response = await api.get<Event[]>('event/');
    return response.data
  }
  catch(err: any) {
    console.error("Error fetching events:", err.response?.data?.error || err.message )
    throw err
  }

}
// Get a specific blog
export const getEventDetails = async ( eventId: number ): Promise<Event> => {
  try {
    const response = await api.get<Event>(`event/${eventId}`);
    return response.data
  }
  catch(err: any) {
    console.error("Error fetching event details:", err.response?.data?.error || err.message )
    throw err
  }
}

