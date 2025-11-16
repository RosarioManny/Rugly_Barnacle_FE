import { Header } from "../../components/layout/_header"
import { useEffect, useState } from "react"
import { ReturnToTop } from "../../components/ui/buttons"
import { type Event, getEventDetails, getEvents } from "../../lib/api/Event/eventServices"
import { EventCard } from "./components/EventCard"
import { BallOfYarnIcon, DangerIcon } from "../../components/ui/icons-svgs/SvgIcons"

export const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'success' | 'idle'>('success');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [])

  const fetchEvents = async () => {
    try {
      setStatus('loading');
      const data = await getEvents();
      setEvents(data)
      setStatus('success');
    } catch(err) {
      setStatus('error')
    } finally {
      setStatus('idle')
    }
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  }

  // Loading State
  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-fleece mb-36 md:mb-48">
        <Header 
          title="Events"
          tagline="Join Rugly Barnacle at upcoming events, workshops, and markets!"
        />
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex mb-6 justify-center items-center">
            <img 
              className="flex items-center mr-4 size-10" 
              src="/assets/design/icons/X_Star_Teal-Blue.webp" 
              aria-hidden="true" 
              alt="Cross Star Design Marker" 
            />
            <h1 className="text-3xl font-bold text-space_cadet">Upcoming Events</h1>
          </div>
          
          {/* Skeleton Loading */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-majorelle p-4 animate-pulse">
                <div className="h-6 bg-space_cadet/30 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-space_cadet/30 rounded w-1/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-space_cadet/30 rounded"></div>
                  <div className="h-4 bg-space_cadet/30 rounded w-5/6"></div>
                  <div className="h-4 bg-space_cadet/30 rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <ReturnToTop />
      </main>
    )
  }

  // Error State
  if (status === 'error') {
    return (
      <main className="min-h-screen bg-fleece mb-36 md:mb-48">
        <Header 
          title="Events"
          tagline="Join Rugly Barnacle at upcoming events, workshops, and markets!"
        />
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex mb-6 justify-center items-center">
            <img 
              className="flex items-center mr-4 size-10" 
              src="/assets/design/icons/X_Star_Teal-Blue.webp" 
              aria-hidden="true" 
              alt="Cross Star Design Marker" 
            />
            <h1 className="text-3xl font-bold text-space_cadet">Upcoming Events</h1>
          </div>
          
          <div className="text-center py-12">
            <div className="bg-bittersweet/10 border border-bittersweet items-center rounded-lg p-8 max-w-md mx-auto">
              <div className="text-bittersweet flex items-center justify-center text-6xl mb-4">
                <DangerIcon />
              </div>
              <h2 className="text-xl font-semibold text-space_cadet mb-2">
                Unable to Load Events
              </h2>
              <p className="text-space_cadet mb-4">
                Sorry, we encountered an error while loading the events.
              </p>
              <button
                onClick={fetchEvents}
                className="bg-bittersweet/70 hover:bg-bittersweet duration-300 ease-in-out text-white px-4 py-2 rounded transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
        <ReturnToTop />
      </main>
    )
  }

  // Empty State
  if (status === 'success' && events.length === 0) {
    return (
      <main className="min-h-screen bg-fleece mb-36 md:mb-48">
        <Header 
          title="Events"
          tagline="Join Rugly Barnacle at upcoming events, workshops, and markets!"
        />
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex mb-6 justify-center items-center">
            <img 
              className="flex items-center mr-4 size-10" 
              src="/assets/design/icons/X_Star_Teal-Blue.webp" 
              aria-hidden="true" 
              alt="Cross Star Design Marker" 
            />
            <h1 className="text-3xl font-bold text-space_cadet">Upcoming Events</h1>
          </div>
          
          <div className="text-center py-4">
            <div className="bg-majorelle/10 border border-majorelle rounded-lg p-10 max-w-md mx-auto">
              <div className="flex justify-center mb-4 ">
                <BallOfYarnIcon className="yarn-animation fill-space_cadet"/>
              </div>
              <h2 className="text-xl font-semibold text-space_cadet mb-2">
                No Events Scheduled
              </h2>
              <p className="text-space_cadet">
                Check back soon for upcoming events and workshops!
              </p>
            </div>
          </div>
        </section>
        <ReturnToTop />
      </main>
    )
  }

  // Success State
  return (
    <main className="min-h-screen bg-fleece mb-36 md:mb-48">
      <Header 
        title="Events"
        tagline="Join Rugly Barnacle at upcoming events, workshops, and markets!"
      />
      
      {/* Events List */}
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex mb-6 justify-center items-center">
        <img 
          className="flex items-center mr-4 size-10" 
          src="/assets/design/icons/X_Star_Teal-Blue.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" 
        />
        <h1 className="text-3xl font-bold text-space_cadet">Upcoming Events</h1>
      </div>
      
      {/* Single column layout for full-width cards */}
      <div className="space-y-6">
        {events.map((event, idx) => (
          <EventCard 
            key={event.id || idx}
            event={event}
            onClick={() => handleEventClick(event)}
          />
        ))}
      </div>
    </section>

      {/* Event Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header with close button */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-space_cadet">{selectedEvent.title}</h2>
                <button
                  onClick={closeModal}
                  className="text-space_cadet hover:text-bittersweet transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Event Image */}
              {selectedEvent.image && (
                <div className="mb-4">
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Event Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-space_cadet">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{selectedEvent.location}</span>
                </div>

                <div className="flex items-center text-space_cadet">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{new Date(selectedEvent.start_time).toLocaleDateString()}</span>
                </div>

                {selectedEvent.price !== null && selectedEvent.price !== undefined && (
                  <div className="flex items-center text-space_cadet">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span>${selectedEvent.price}</span>
                  </div>
                )}
              </div>

              {/* Event Description */}
              <div className="mb-6">
                <p className="text-space_cadet leading-relaxed">{selectedEvent.description}</p>
              </div>

              {/* Learn More Button */}
              {selectedEvent.ticket_link && (
                <div className="flex justify-end">
                  <a
                    href={selectedEvent.ticket_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-majorelle hover:bg-majorelle/80 text-white px-6 py-2 rounded-lg transition-colors duration-300"
                  >
                    Learn More
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <ReturnToTop />
    </main>
  );
}