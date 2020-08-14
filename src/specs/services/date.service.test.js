
import DateService from './../../services/date.service';

test('DateService.getDateFromIsoString', () => {
  expect(DateService.getDateFromIsoString('2020-01-01T20:00:00.000Z').toUTCString())
    .toBe('Wed, 01 Jan 2020 20:00:00 GMT');
});

test('DateService.getDateFromTimeStampNumber', () => {
  expect(DateService.getDateFromTimeStampNumber(1577908800000).toUTCString())
    .toBe('Wed, 01 Jan 2020 20:00:00 GMT');
});

test('DateService.getIsoDateString', () => {
  expect(DateService.getIsoDateString(new Date(Date.UTC(2020, 0, 1, 20, 0, 0, 0))))
    .toBe('2020-01-01T20:00:00.000Z');
});

test('DateService.cloneDate', () => {
  expect(DateService.cloneDate(new Date(Date.UTC(2020, 0, 1, 20, 0, 0, 0))).toUTCString())
    .toBe('Wed, 01 Jan 2020 20:00:00 GMT');
});

test('DateService.addOrRemoveDays', () => {
  expect(DateService.addOrRemoveDays(new Date(Date.UTC(2020, 0, 1, 20, 0, 0, 0)), 1).toUTCString())
    .toBe('Thu, 02 Jan 2020 20:00:00 GMT');
  
  expect(DateService.addOrRemoveDays(new Date(Date.UTC(2020, 0, 3, 20, 0, 0, 0)), -2).toUTCString())
    .toBe('Wed, 01 Jan 2020 20:00:00 GMT');
});

test('DateService.getDateTimeString', () => {
  expect(DateService.getDateTimeString(new Date(2020, 0, 1, 20, 0, 0, 0)))
    .toBe('Jan 01, 2020, 20:00');

  expect(DateService.getDateTimeString(new Date(2020, 0, 1, 20, 0, 0, 0), false))
    .toBe('Jan 01, 20:00');

  expect(DateService.getDateTimeString(new Date(2020, 0, 1, 20, 0, 0, 0), false, true))
    .toBe('Jan 01 (01/01), 20:00');
  
  expect(DateService.getDateTimeString(new Date(2020, 0, 1, 20, 0, 0, 0), false, false, 'on'))
    .toBe('on Jan 01, 20:00');

  expect(DateService.getDateTimeString(new Date(), false, false, 'on'))
    .toMatch(/^Today, [0-9]{2}:[0-9]{2}$/);
});

test('DateService.getDateString', () => {
  expect(DateService.getDateString(new Date(2020, 0, 1, 20, 0, 0, 0)))
    .toBe('Jan 01, 2020');
    
  expect(DateService.getDateString(new Date(2020, 0, 1, 20, 0, 0, 0), true, false))
    .toBe('Jan 01');
    
  expect(DateService.getDateString(new Date(2020, 0, 1, 20, 0, 0, 0), false, false))
    .toBe('01/01');
  
  expect(DateService.getDateString(new Date(2020, 0, 1, 20, 0, 0, 0), true, false, 'on'))
    .toBe('on Jan 01');
  
  expect(DateService.getDateString(new Date(), true, false, 'on'))
    .toBe('Today');
});

test('DateService.getMonthYearString', () => {
  expect(DateService.getMonthYearString(new Date(2020, 0, 1, 20, 0, 0, 0)))
    .toBe('01/2020');
});

test('DateService.getTimeString', () => {
  expect(DateService.getTimeString(new Date(2020, 0, 1, 20, 0, 0, 0)))
    .toBe('20:00');
});

test('DateService.getDatePartString', () => {
  expect(DateService.getDatePartString(new Date(2020, 0, 1, 20, 0, 0, 0), 
      { day: 'numeric' }))
    .toBe('1');
  
  expect(DateService.getDatePartString(new Date(2020, 0, 1, 20, 0, 0, 0), 
      { year: 'numeric' }))
    .toBe('2020');
});

test('DateService.getTimePartString', () => {
  expect(DateService.getTimePartString(new Date(2020, 0, 1, 20, 0, 0, 0), 
      { hour: '2-digit' }))
    .toBe('20');
});

test('DateService.areDatesTheSameDay', () => {
  expect(DateService.areDatesTheSameDay(new Date(2020, 0, 1, 20, 0, 0, 0), new Date(2020, 0, 1, 17, 0, 0, 0))).toBeTruthy();

  expect(DateService.areDatesTheSameDay(new Date(2020, 0, 1, 20, 0, 0, 0), new Date(2020, 0, 6, 20, 0, 0, 0))).toBeFalsy();
});

test('DateService.isToday', () => {
  expect(DateService.isToday(new Date())).toBeTruthy();
  
  expect(DateService.isToday(new Date(2020, 0, 1, 20, 0, 0, 0))).toBeFalsy();
});

test('DateService.isYesterday', () => {
  expect(DateService.isYesterday(DateService.addOrRemoveDays(new Date(), -1))).toBeTruthy();
  
  expect(DateService.isYesterday(new Date(2020, 0, 1, 20, 0, 0, 0))).toBeFalsy();
});

test('DateService.isTomorrow', () => {
  expect(DateService.isTomorrow(DateService.addOrRemoveDays(new Date(), 1))).toBeTruthy();
  
  expect(DateService.isTomorrow(new Date(2020, 0, 1, 20, 0, 0, 0))).toBeFalsy();
});

test('DateService.getDifference', () => {
  expect(DateService.getDifference(new Date(2020, 0, 1, 17, 0, 0, 0), new Date(2020, 0, 1, 20, 0, 0, 0)))
    .toBe(3 * 60 * 60 * 1000);

  expect(DateService.getDifference(new Date(2020, 0, 1, 20, 0, 0, 0), new Date(2020, 0, 1, 15, 0, 0, 0)))
    .toBe(-5 * 60 * 60 * 1000);
});

test('DateService.getTimestampDifference', () => {
  expect(DateService.getTimestampDifference(1577908800000, 1577890800000))
    .toBe(-5 * 60 * 60 * 1000);

  expect(DateService.getTimestampDifference(1577908800000, 1577919600000))
    .toBe(3 * 60 * 60 * 1000);
});

test('DateService.getRelativeDifference', () => {
  expect(DateService.getRelativeDifference(new Date(Date.UTC(2020, 0, 1, 20, 0, 0, 0))))
    .toBeLessThan(0);

  expect(DateService.getRelativeDifference(DateService.addOrRemoveDays(new Date(), -1)))
    .toBeLessThan(0);

  expect(DateService.getRelativeDifference(DateService.addOrRemoveDays(new Date(), 1)))
    .toBeGreaterThan(0);
});



