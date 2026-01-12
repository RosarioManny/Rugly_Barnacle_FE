import { Header } from "../../components/layout/_header"
import { useEffect, useState } from "react"
import { ReturnToTop } from "../../components/ui/buttons"
import { type Event, getEvents } from "../../lib/api/Event/eventServices"
import { EventCard } from "./components/EventCard"
import { BallOfYarnIcon, DangerIcon, ClockIcon, CalendarIcon, PinIcon, DollarIcon} from "../../components/ui/icons-svgs/SvgIcons"
import { formatTime } from "../../lib/utils/dateFormtater"


export const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [status, setStatus] = useState<'loading' | 'error' | 'success' | 'idle'>('idle');
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
          <div className=" grid gap-6">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-majorelle p-4 animate-pulse">
                <div className="h-6 bg-space_cadet/30 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-space_cadet/30 rounded w-1/4 mb-4"></div>
                <div className="space-y-2 ">
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

  return (
    <main className="min-h-screen bg-fleece mb-36 md:mb-48">
      <Header 
        title="Events"
        tagline="Join Rugly Barnacle at upcoming events, workshops, and markets!"
      />
      
      {/* Events List */}
    <section className={`${ isModalOpen ? "overflow-y-hidden" : "overflow-y-hidden"} max-w-6xl mx-auto px-4 py-8`}>
      <div className="flex mb-6 justify-center items-center">
        <img 
          className="flex items-center mr-4 size-10" 
          src="/assets/design/icons/X_Star_Teal-Blue.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" 
        />
        <h1 className="text-3xl font-bold text-space_cadet">Upcoming Events</h1>
      </div>
      {events.length === 0 ? 
      (
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
      ) : (

        <div className="space-y-6">
          {events.map((event, idx) => (
            <EventCard 
              key={event.id || idx}
              event={event}
              onClick={() => handleEventClick(event)}
            />
          ))}
        </div>
      )}
      
    </section>

      {/* Event Modal */}
{isModalOpen && selectedEvent && (

  <div 
    onClick={closeModal}
    className="fixed inset-0 bg-space_cadet/50 flex items-center justify-center p-2 sm:p-4 z-50"
  >
    
    <div 
      onClick={(e) => e.stopPropagation()}
      className="bg-fleece flex flex-col lg:flex-row rounded-lg max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
    >
      {/* Image Section - Top on mobile, Left on desktop */}
      <div className="lg:flex-1 lg:min-w-0 lg:h-full text-bittersweet">
        <button
          onClick={closeModal}
          className="text-space_cadet flex items-center hover:text-bittersweet transition-colors flex-shrink-0 ml-2"
        >
          <svg className="hover:cursor-pointer size-8 sm:size-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="">Close</span>
        </button>
        {selectedEvent.image && (
          <div className="h-64 sm:h-80 lg:h-full w-full">
            <img 
              src={selectedEvent.image} 
              alt={selectedEvent.title}
              className="size-full object-contain lg:object-cover bg-gray-100"
            />
          </div>
        )}
      </div>

      {/* Information Section - Bottom on mobile, Right on desktop */}
      <div className="lg:flex-1 lg:min-w-0 overflow-y-auto">
        <div className="p-4 sm:p-6 h-full flex flex-col">
          {/* Header with close button */}
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-space_cadet pr-4">{selectedEvent.title}</h2>

          </div>

          {/* Event Details */}
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {/* Location */}
            <div className="flex items-start  text-space_cadet">
              <PinIcon className="text-majorelle size-6 sm:size-7 mr-2 flex-shrink-0 mt-0.5"/>
              <span className="break-words text-sm sm:text-base">{selectedEvent.location}</span>
            </div>

            {/* Date */}
            <div className="flex items-center text-space_cadet">
              <CalendarIcon className="text-majorelle size-6 sm:size-7 mr-2 flex-shrink-0"/>
              <span className="text-sm sm:text-base">
                {new Date(selectedEvent.start_time).toLocaleDateString('en-US', { 
                  weekday: 'short',
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </span>
            </div>

            {/* Times */}
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-start text-space_cadet">
                <ClockIcon className="text-majorelle size-6 sm:size-7 mr-2 flex-shrink-0 mt-0.5"/>
                <div className="flex flex-col">
                  <span className="font-medium text-sm sm:text-base">Start: {formatTime(selectedEvent.start_time)}</span>
                  {selectedEvent.end_time && (
                    <span className="font-medium text-sm sm:text-base mt-0.5 sm:mt-1">End: {formatTime(selectedEvent.end_time)}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Price */}
            {selectedEvent.price !== null && selectedEvent.price !== undefined && selectedEvent.price !== 0 && (
              <div className="flex items-center text-space_cadet">
                <DollarIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0"/>
                <span className="text-sm sm:text-base">${selectedEvent.price.toFixed(2)}</span>
              </div>
            )}
          </div>

          {/* Event Description */}
          <div className="mb-4 sm:mb-6 flex-grow">
            <h3 className="font-semibold text-space_cadet mb-2 text-sm sm:text-base">About This Event</h3>
            <p className="text-space_cadet leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {selectedEvent.description}
            </p>
          </div>

          {/* Learn More Button */}
          {selectedEvent.ticket_link && (
            <div className="pt-3 sm:pt-4 border-t border-space_cadet/20">
              <a
                href={selectedEvent.ticket_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-majorelle hover:bg-majorelle/80 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors duration-300 w-full text-center text-sm sm:text-base"
              >
                Get Tickets / Learn More
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)}
      <ReturnToTop />
    </main>
  );
}