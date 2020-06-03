
const DateService = {
  getDateFromIsoString: isoDateString => new Date(isoDateString),
  getDateFromTimeStampNumber: timeStampNumber => new Date(timeStampNumber),

  getCurrentIsoDateString: () => new Date().toISOString(),
  getIsoDateString: date => date.toISOString(),
  getCurrentTimeStampNumber: () => +new Date(),

  cloneDate: date => new Date(date.getTime()),

  addOrRemoveDays: (date, amount) => {
    let newDate = DateService.cloneDate(date);
    newDate.setDate(newDate.getDate() + amount);
    return newDate;
  },

  getDateTimeString: (date, withYear = true) => {
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
  getDateString: (date, descriptiveDate = true, withYear = true) => {
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
    return date.toLocaleDateString([], DATE_TRANSFORM_OPTIONS);
  },
  getMonthYearString: date => {
    const DATE_TRANSFORM_OPTIONS = {
      year: 'numeric',
      month: '2-digit'
    };
    return date.toLocaleDateString([], DATE_TRANSFORM_OPTIONS);
  },
  getTimeString: date => {
    const TIME_TRANSFORM_OPTIONS = {
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleTimeString([], TIME_TRANSFORM_OPTIONS);
  },
  getDatePartString: (date, transformOptions) => (
    date.toLocaleDateString([], transformOptions)
  ),

  areDatesTheSameDay: (date1, date2) => date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate(),
  isToday: date => DateService.areDatesTheSameDay(date, new Date()),
  isYesterday: date => DateService.areDatesTheSameDay(date, new Date(+(new Date()) - (24*60*60*1000))),
  isTomorrow: date => DateService.areDatesTheSameDay(date, new Date(+(new Date()) + (24*60*60*1000))),

  getDifference: (date1, date2) => (+date2) - (+date1),
  getRelativeDifference: date => DateService.getDifference(new Date(), date),

  _watcher: null,
  _watchDate: () => DateService._watcher = setInterval(DateService.notifyNewDate, 20000),
  _unwatchDate: () => DateService._watcher && clearInterval(DateService._watcher),

  _observers: {},
  addObserver: (observerCallback, observerKey) => {
    DateService._observers[observerKey] = observerCallback;
    observerCallback();
    DateService._computeObserverNumber() >= 1 && DateService._watchDate();
  },
  removeObserver: observerKey => {
    delete DateService._observers[observerKey];
    DateService._observers[observerKey] = null;
    DateService._computeObserverNumber() === 0 && DateService._unwatchDate();
  },
  notifyNewDate: () => Object.values(DateService._observers).filter(obs => obs && typeof obs === 'function').forEach(obs => obs()),
  _computeObserverNumber: () => Object.values(DateService._observers).filter(obs => obs && typeof obs === 'function').length
};

export default DateService;
