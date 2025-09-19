export const formatCartDate = (dateString: string): string => {
  console.log(typeof(dateString))
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};