
/**
 * Service: DateService
 * Operations on date
 * 
 * This service manipulates JS dates, ISO string as described in ISO 8601, and timestamp (number of milliseconds since 1970, Jan 1st 00:00:00).
 * 
 * Date are present in the app to do operations on them
 * ISO strings are saved into DB as readable dates
 * Timestamp may also be saved into DB, but only along with an ISO string because they permit to be compared to other timestamps easily
 */
const DateService = {

  // Get a JS date from an ISO string
  getDateFromIsoString: isoDateString => new Date(isoDateString),
  // Get a JS date from a timestamp
  getDateFromTimeStampNumber: timeStampNumber => new Date(timeStampNumber),

  // Get the current date, as ISO string
  getCurrentIsoDateString: () => new Date().toISOString(),
  // get the current date, as JS date
  getCurrentDate: () => new Date(),
  // Get the current timestamp
  getCurrentTimeStampNumber: () => +new Date(),

  // Get an ISO string from a JS date
  getIsoDateString: date => date.toISOString(),

  // Clone a JS date and return another JS date with no link between them (apart they are the same date)
  cloneDate: date => new Date(date.getTime()),

  // add an amout of days (or remove some days by passing a negative amount of days)
  addOrRemoveDays: (date, amount) => {
    // clone the date
    let newDate = DateService.cloneDate(date);

    // add the number of days to the date
    newDate.setDate(newDate.getDate() + amount);
    return newDate;
  },

  // format a date and time into a printable string
  // date: Date | the date to be formatted
  // withYear: boolean | If the year should be printed or not
  // fullDate: boolean | if true, always print the full date (day/month) event if a descriptive keyword (like 'today') is printed
  // prefix: string | If a prefix should be used (like 'on'), pass it here. The keyword will not be printed if a descriptive keyword (like 'today') is used.
  getDateTimeString: (date, withYear = true, fullDate = false, prefix = '') => {
    return `${DateService.getDateString(date, true, withYear, prefix)}${fullDate ? ` (${DateService.getDateString(date, false, withYear)})` : ''}, ${DateService.getTimeString(date)}`;
  },

  // Format a date into a printable string
  // date: Date | the date to be formatted
  // descriptiveDate: boolean | if true, this function may return 'today', 'tomorrow' or other keywords if applicable. If false, always print the full date
  // withYear: boolean | print along with the year. if false, only print the day and month
  // prefix: string | prefix of the date (like 'on'). If a keyword is returned (like 'today'), the prefix is not concatenated.
  getDateString: (date, descriptiveDate = true, withYear = true, prefix = '') => {
    let DATE_TRANSFORM_OPTIONS = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    };
    !withYear && delete DATE_TRANSFORM_OPTIONS.year;
    if(descriptiveDate) {
      if(DateService.isToday(date)) { return 'Today'; }
      if(DateService.isYesterday(date)) { return 'Yesterday'; }
      if(DateService.isTomorrow(date)) { return 'Tomorrow'; }

      DATE_TRANSFORM_OPTIONS['month'] = 'short';
    }
    return (prefix ? `${prefix} ` : '') + date.toLocaleDateString([], DATE_TRANSFORM_OPTIONS);
  },

  // format a date to a month/year string
  // date: Date | the date to format
  getMonthYearString: date => {
    const DATE_TRANSFORM_OPTIONS = {
      year: 'numeric',
      month: '2-digit'
    };
    return date.toLocaleDateString([], DATE_TRANSFORM_OPTIONS);
  },

  // Format a time into a printable string (HH:MM)
  // date: Date | the date to be formatted
  getTimeString: date => {
    const TIME_TRANSFORM_OPTIONS = {
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleTimeString([], TIME_TRANSFORM_OPTIONS);
  },

  // Format a date into a custom printable string
  // date: Date | the date to be formated
  //transformOptions: Object | propreties as specified here ( https://tc39.es/ecma402/#sec-intl-datetimeformat-constructor )
  getDatePartString: (date, transformOptions) => (
    date.toLocaleDateString([], transformOptions)
  ),


  // check if two dates are the same day or not
  areDatesTheSameDay: (date1, date2) => date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate(),

  // Check if the date is today
  isToday: date => DateService.areDatesTheSameDay(date, new Date()),

  // check if the date is yesterday
  isYesterday: date => DateService.areDatesTheSameDay(date, new Date(+(new Date()) - (24*60*60*1000))),

  // check if the date is tomorrow
  isTomorrow: date => DateService.areDatesTheSameDay(date, new Date(+(new Date()) + (24*60*60*1000))),

  // get numerical difference between two dates (number of milliseconds between two dates)
  getDifference: (date1, date2) => (+date2) - (+date1),

  // Get numerical difference between two timestamp numbers (number of milliseconds)
  getTimestampDifference: (ts1, ts2) => ts2 - ts1,

  // Get relative difference between a date and now (negative means before, postiive means after)
  getRelativeDifference: date => DateService.getDifference(new Date(), date),

  // Watcher for date
  // This watcher refresh the date every 20 seconds
  _watcher: null,

  // watch date, and notify date observers every 20 seconds
  _watchDate: () => {
    // remove previous watcher if present
    DateService._watcher && clearInterval(DateService._watcher);

    // add a new watcher
    DateService._watcher = setInterval(DateService.notifyNewDate, 20000);
  },
  // unwatch date (remove the watcher if not needed)
  _unwatchDate: () => DateService._watcher && clearInterval(DateService._watcher),

  // date observers list
  _observers: {},

  // add an observer
  // pass a callback that will be called each time the date changed
  addObserver: (observerCallback, observerKey) => {

    // storing the callback
    DateService._observers[observerKey] = observerCallback;

    // notify the observer immediately
    observerCallback();

    // If needed, launch the date watcher
    DateService._computeObserverNumber() >= 1 && DateService._watchDate();
  },

  // remove observer passing the same unique observer key you passed when adding it
  // This is used to clean your component from receiving new date
  removeObserver: observerKey => {

    // remove the observer
    delete DateService._observers[observerKey];
    DateService._observers[observerKey] = null;

    // if there's no observer anymore, stop the watcher
    DateService._computeObserverNumber() === 0 && DateService._unwatchDate();
  },

  // Notify all observer when the date changed
  notifyNewDate: () => Object.values(DateService._observers).filter(obs => obs && typeof obs === 'function').forEach(obs => obs()),

  // compute the number of current date observers
  _computeObserverNumber: () => Object.values(DateService._observers).filter(obs => obs && typeof obs === 'function').length
};

export default DateService;
