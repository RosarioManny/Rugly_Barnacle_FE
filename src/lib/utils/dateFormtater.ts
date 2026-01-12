export const formatCartDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (dateString: string) => {
  // Parse the date, treating it as if it's already in NYC time
  
  // Remove the 'Z' and parse as local
  const localDateString = dateString.replace('Z', '');
  const date = new Date(localDateString);
  
  // Now format it for NYC timezone (this will keep the same hour/minute)
  return date.toLocaleTimeString('en-US', {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};