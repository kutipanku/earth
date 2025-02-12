/**
 * Create locale date string
 * @param "new Date('2023-05-14')"
 * @example "Minggu, 14 Mei 2023"
 */
const convertDateToTime = (date: string) => {
  try {
    const currentDate = new Date(date);
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    return `${hours}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
  } catch (_) {
    return `Invalid date`;
  }
};

export default convertDateToTime;
