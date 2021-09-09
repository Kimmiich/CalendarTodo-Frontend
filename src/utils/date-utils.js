import moment from 'moment';
import {
  getSpecificDate,
  getMonth,
  getYear,
  getMonthDayYear,
} from './moment-utils';
// import { totalDatesPerMonthView } from '../constants/dates';

const totalDatesPerMonthView = 35;

//Helper functions
const getPrevMonthYear = (month, year) => {
  //If it is January... prev month is Dec of the previous year
  if (month === 1) {
    return {
      month: 12,
      year: year - 1,
    };
  } else {
    //Otherwise, same year, but month -1
    return {
      month: month - 1,
      year,
    };
  }
};

const getNextMonthYear = (month, year) => {
  if (month === 12) {
    return {
      month: 1,
      year: year + 1,
    };
  } else {
    return {
      month: month + 1,
      year,
    };
  }
};

const getDatesInMonthDisplay = (month, year) => {
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

const getMonthSet = (selectDate) => {
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

const presetDateTracker = (dates) => {
  const result = {};

  if (dates && Array.isArray(dates)) {
    dates.forEach((date) => {
      const dateStr = getMonthDayYear(date);

      if (!result[dateStr]) {
        result[dateStr] = 1;
      } else {
        result[dateStr] += 1;
      }
    });
  }

  return result;
};

export { getDatesInMonthDisplay, getMonthSet, presetDateTracker };
