export const convertDateToLocaleString = (date: string) => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString('en-EN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
};
