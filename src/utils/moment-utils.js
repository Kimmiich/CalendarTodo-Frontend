import moment from 'moment';

export const getSpecificDate = (month, daysOfMonth, year) => {
  return moment(`${month}-${daysOfMonth}-${year}`, 'MM-DD-YYYY').toDate();
};

export const getDayOfMonth = (date) => moment(date).date();

export const getMonth = (date) => moment(date).month();

export const getYear = (date) => moment(date).year();

export const getToday = (date) => moment(date).format('MM-DD-YYYY');

export const getReadableWeekday = (date) => moment(date).format('dddd - DD');

export const getReadableMonthDate = (date) => moment(date).format('MMMM');

export const getMonthDayYear = (date) => moment(date).format('MM-DD-YYYY');

// console.log(moment().toDate().toISOString());
