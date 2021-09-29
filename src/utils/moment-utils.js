import moment from 'moment';

const totalDatesPerMonthView = 35;

const getPrevMonthYear = (month, year) =>
  month === 1 ? { month: 12, year: year - 1 } : { month: month - 1, year };

const getNextMonthYear = (month, year) =>
  month === 12 ? { month: 1, year: year + 1 } : { month: month + 1, year };

export const getSpecificDate = (month, daysOfMonth, year) => {
  return moment(`${month}-${daysOfMonth}-${year}`, 'MM-DD-YYYY').toDate();
};

export const getDatesInMonthDisplay = (month, year) => {
  const daysInMonth = moment(`${month}-${year}`, 'MM-YYYY').daysInMonth();
  const firstWeekday = moment(`${month}-${year}`, 'MM-YYYY')
    .startOf('month')
    .weekday();
  const result = [];

  const prevMonthYear = getPrevMonthYear(month, year);
  const prevDaysInMonth = moment(
    `${prevMonthYear.month}-${prevMonthYear.year}`,
    'MM-YYYY'
  ).daysInMonth();

  //Add prev overflow dates...
  for (let i = firstWeekday - 1; i >= 0; i--) {
    result.push({
      currentMonth: false,
      date: getSpecificDate(
        prevMonthYear.month,
        prevDaysInMonth - i,
        prevMonthYear.year
      ),
    });
  }

  //Add current month's dates
  for (let j = 1; j <= daysInMonth; j++) {
    result.push({
      currentMonth: true,
      date: getSpecificDate(month, j, year),
    });
  }

  //Overflow dates for next month to meet 42 days per month display requirement
  if (result.length < totalDatesPerMonthView) {
    const daysToAdd = totalDatesPerMonthView - result.length;
    const nextMonthYear = getNextMonthYear(month, year);
    for (let k = 1; k <= daysToAdd; k++) {
      result.push({
        currentMonth: false,
        date: getSpecificDate(nextMonthYear.month, k, nextMonthYear.year),
      });
    }
  }

  return result;
};

export const getMonthSet = (selectDate) => {
  const month = getMonth(selectDate) + 1;
  const result = {
    current: selectDate,
    prev: getSpecificDate(month - 1, 1, getYear(selectDate)),
    next: getSpecificDate(month + 1, 1, getYear(selectDate)),
  };

  if (month === 1) {
    result.prev = getSpecificDate(12, 1, getYear(selectDate) - 1);
  }

  if (month === 12) {
    result.next = getSpecificDate(1, 1, getYear(selectDate) + 1);
  }

  return result;
};

//Moment calls, diffrent formates

export const getDayOfMonth = (date) => moment(date).date();

export const getMonth = (date) => moment(date).month();

export const getYear = (date) => moment(date).year();

export const getYearMonth = (date) => moment(date).format('YYYY/MM');

export const getReadableDay = (date) => moment(date).format('dddd - Do');

export const getReadableMonth = (date) => moment(date).format('MMMM');

export const getFullDate = (date) => moment(date).format('YYYY-MM-DD');
