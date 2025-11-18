// components/eventCards.tsx
import type { Event } from "../../../lib/api/Event/eventServices";
import { useState } from "react";
import { PinIcon, CalendarIcon, DollarIcon } from "../../../components/ui/icons-svgs/SvgIcons";
import { formatCartDate } from "../../../lib/utils/dateFormtater";
import { getTagStyles, getTagDisplayName } from "../../../lib/utils/tagStyles";

interface EventCardProps {
  event: Event;
  onClick: () => void;
}

export const EventCard = ({ event, onClick }: EventCardProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };



  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-majorelle p-6 cursor-pointer hover:shadow-md transition-all duration-300 w-full mb-4"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row gap-6">
        {/* Event Image */}
        <div className="md:w-1/3 lg:w-1/4 h-full">
          {event.image && !imageError ? (
            <img 
              className="w-full h-48 md:h-40 object-cover rounded-lg"
              src={event.image}
              alt={event.title}
              onError={handleImageError}
            />
          ) : (
            <div className=" md:h-40 bg-fleece rounded-lg flex flex-col justify-center items-center p-4 border border-majorelle/20">
              <img 
                className="opacity-90 object-cover"
                src="/assets/design/logo/RuglyBarnacle_Logo.webp" 
                alt="Rugly Barnacle Full Logo - Event image unavailable" 
              />
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="flex-1">
          {/* Header with Event Type and Status */}
          <div className="flex flex-wrap justify-between items-start mb-3">
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${getTagStyles(event.event_type)}`}>
              {getTagDisplayName(event.event_type)}
            </span>
            <div className="flex gap-2">
              {event.status === 'upcoming' && (
                <span className="text-xs font-medium bg-bittersweet/10 text-bittersweet px-3 py-1 rounded-full">
                  UPCOMING
                </span>
              )}
              {event.status === 'ongoing' && (
                <span className="text-xs font-medium bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  HAPPENING NOW
                </span>
              )}
              {event.status === 'cancelled' && (
                <span className="text-xs font-medium bg-red-100 text-red-800 px-3 py-1 rounded-full">
                  CANCELLED
                </span>
              )}
            </div>
          </div>

          {/* Event Title */}
          <h3 className="text-xl font-bold text-space_cadet mb-3 line-clamp-2">
            {event.title}
          </h3>

          {/* Event Meta Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {/* Date and Time */}
            <div className="flex items-center text-space_cadet text-sm">
              <CalendarIcon className="w-4 h-4 mr-2 flex-shrink-0"/>
            
              <div>
                <div>{formatCartDate(event.start_time)}</div>
                <div className="text-space_cadet/70">{formatTime(event.start_time)}</div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center text-space_cadet text-sm">
              <PinIcon className="w-4 h-4 mr-2 flex-shrink-0"/>
              <span className="line-clamp-2">{event.location}</span>
            </div>

            {/* Price */}
            {event.price !== null && event.price !== undefined && (
              <div className="flex items-center text-space_cadet text-sm">
                <DollarIcon className="w-4 h-4 mr-2 flex-shrink-0 "/>
                <span className="font-semibold">${event.price}</span>
              </div>
            )}
          </div>

          {/* Event Description Preview */}
          <p className="text-space_cadet text-base leading-relaxed mb-4 line-clamp-2">
            {event.description}
          </p>

          {/* Footer with Click Hint */}
          <div className="flex justify-between items-center">
            {event.registration_deadline && (
              <div className="font-semibold text-bittersweet/70  text-sm">
                Register by: {formatCartDate(event.registration_deadline)}
              </div>
            )}
            <div className="text-majorelle text-base font-semibold ml-auto">
              Details →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};