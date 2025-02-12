/**
 * Create locale date string
 * @param "new Date('2023-05-14')"
 * @example "Minggu, 14 Mei 2023"
 */
const convertDateToLocaleString = (date: string | null) => {
  if (date === null) return 'Invalid date';

  try {
    const dateObject = new Date(date);
    return dateObject.toLocaleDateString('en-EN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (_) {
    return 'Invalid date';
  }
};

export default convertDateToLocaleString;
