
const DateService = {
  getDateFromIsoString: isoDateString => new Date(isoDateString),
  getDateFromTimeStampNumber: timeStampNumber => new Date(timeStampNumber),

  getCurrentIsoDateString: () => new Date().toISOString(),
  getCurrentTimeStampNumber: () => +new Date(),

  getDateTimeString(date, withYear = true) {
    let DATETIME_TRANSFORM_OPTIONS = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    };
    !withYear && delete DATETIME_TRANSFORM_OPTIONS.year;
    return date.toLocaleTimeString([], DATETIME_TRANSFORM_OPTIONS);
  },
  getDateString(date, withYear = true) {
    let DATE_TRANSFORM_OPTIONS = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    !withYear && delete DATE_TRANSFORM_OPTIONS.year;
    return date.toLocaleDateString([], DATE_TRANSFORM_OPTIONS);
  },
  getTimeString(date) {
    const TIME_TRANSFORM_OPTIONS = {
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleTimeString([], TIME_TRANSFORM_OPTIONS);
  },

  areDatesTheSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate();
  },
  isToday: date => DateService.areDatesTheSameDay(date, new Date()),

  getDifference: (date1, date2) => Math.abs((+date2) - (+date1)),
};

export default DateService;
