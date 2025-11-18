export const TAG_DISPLAY_NAMES: {[key: string]: string} = {
  "personal": 'Personal',
  "rug_making": 'Rug Making',
  "inspiration": 'Inspration',
  "events": 'Events',
  "online": 'Online',
  "workshop": 'Workshop',
  "meet-up": 'Meet Up',
  "venue": 'Venue',
  "market": 'Market'
}

export const TAG_STYLES: {[key: string]: string } = {
  // Majorelle
  "personal": 'font-semibold bg-majorelle/90 text-white',
  "meet-up": 'font-semibold bg-majorelle/90 text-white',
  // Robin_egg
  "workshop": 'font-semibold bg-robin_egg/90 text-white',
  "inspiration": 'font-semibold bg-robin_egg/90 text-white',
  // Bittersweet
  "rug_making": 'font-semibold bg-bittersweet/90 text-white',
  "venue": 'font-semibold bg-bittersweet/90 text-white',
  // Mauve
  "market": 'font-semibold bg-mauve/90 text-white',
  "market2": 'font-semibold bg-mauve/90 text-white',
  // Midnight_green
  "online": 'font-semibold bg-space_cadet/90 text-white',
  "events": 'font-semibold bg-space_cadet/90 text-white',
}

export const getTagDisplayName = (tagKey: string): string => {
  return TAG_DISPLAY_NAMES[tagKey] || tagKey;
}

export const getTagStyles = (tagKey: string) => {
    return TAG_STYLES[tagKey] || 'font-semibold bg-midnight_green/20 text-midnight_green'
  }

