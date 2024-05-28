/**
 * Create locale date string
 * @param "new Date('2023-05-14')"
 * @example "Minggu, 14 Mei 2023"
 */
export const convertDateToLocaleString = (date: string) => {
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
