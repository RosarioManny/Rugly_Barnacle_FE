import { useState } from 'react';
import { type Event } from '../../../lib/api/Event/eventServices';

export const EventsModalImage = ({event}: {event: Event }) => {
  const [imageError, setImageError] = useState(false);

  // If event.image has a value(string) and imageError is True means the image failed to load
  if (event.image && imageError) { 
    return (
      <div className="h-64 sm:h-80 lg:h-full w-full bg-fleece p-6 flex flex-col justify-center items-center ">
        <img 
          className="opacity-90 object-cover"
          src="/assets/design/logo/RuglyBarnacle_Logo.webp" 
          alt="Rugly Barnacle Full Logo - Event image unavailable" 
        />
      </div>
    );
  }

  return (
    <div className="h-64 sm:h-80 lg:h-full w-full">
    
      <img 
        src={event.image || undefined} 
        alt={event.title}
        className="size-full object-contain lg:object-cover bg-gray-100"
        onError={() => setImageError(true)}
      />
    </div>
  )
}