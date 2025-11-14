export const TAG_DISPLAY_NAMES: {[key: string]: string} = {
  personal: 'Personal',
  rug_making: 'Rug Making',
  inspiration: 'Inspration',
  events: 'Events'
}

export const getTagDisplayName = (tagKey: string): string => {
  return TAG_DISPLAY_NAMES[tagKey] || tagKey;
}

export const getTagStyles = (tagKey: string) => {
    switch(tagKey) {
      case 'personal':
        return 'font-semibold bg-majorelle/20 text-majorelle';
      case 'inspiration':
        return 'font-semibold bg-robin_egg/20 text-robin_egg';
      case 'rug_making':
        return 'font-semibold bg-bittersweet/20 text-bittersweet';
      case 'events':
        return 'font-semibold bg-midnight_green/20 text-midnight_green';
      default:
        return 'font-semibold bg-gray-200 text-gray-700';
    }
  }