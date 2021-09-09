import React, { useState, useEffect } from 'react';
import {
  getDayOfMonth,
  getMonthDayYear,
  getMonth,
  getYear,
} from '../../utils/moment-utils';
import { getDatesInMonthDisplay } from '../../utils/date-utils';
import moment from 'moment';
// import { getHolidayApi } from '../../utils/APIHelper';
// import TodoItem from '../Todo/TodoItem';

const DateIndicator = ({
  activeDates,
  selectDate,
  setSelectDate,
  todos,
  setDay,
}) => {
  // const [holidays, setHolidays] = useState([]);

  // //Fetch api
  // useEffect((sele) => {
  //   const fetchHolidaysAndSetHolidays = async () => {
  //     const holidays = await getHolidayApi(
  //       moment(selectDate).format('YYYY/MM')
  //     );
  //     setHolidays(holidays);
  //   };
  //   fetchHolidaysAndSetHolidays();
  // }, [selectDate]);

  // console.log(holidays);
  //event handling callbacks
  const changeDate = (e) => {
    setSelectDate(e.target.getAttribute('data-date'));
  };

  const datesInMonth = getDatesInMonthDisplay(
    getMonth(selectDate) + 1,
    getYear(selectDate)
  );

  //Catch date from specific day
  const handleClick = (e) => {
    let newDay = e.target.parentNode.id;
    setDay(newDay);
  };

  const monthDates = datesInMonth.map((i) => {
    const selected =
      getMonthDayYear(selectDate) === getMonthDayYear(i.date) ? 'selected' : '';
    const active =
      activeDates && activeDates[getMonthDayYear(i.date)] ? 'active' : ';';

    console.log(moment(selectDate).format('YYYY/MM'));

    // const getApiDays = (selectDate) => {};

    const getTodos = (selectDate) => {
      const toDaysTodos = todos.filter(
        (todo) =>
          moment(todo.date).format('YYYY-MM-DD') ===
          moment(selectDate).format('YYYY-MM-DD')
      );

      const number = toDaysTodos.length;

      if (number > 0) {
        return (
          <p className="task-tracker-on-day">
            {number} {number > 1 ? 'tasks' : 'task'}
          </p>
        );
      } else {
        return;
      }
    };

    return (
      <article
        id={moment(i.date).format('YYYY-MM-DD')}
        key={moment(i.date).format('YYYY-DDD')}
        className="day-container"
      >
        <div
          className={`date-icon ${selected} ${active}`}
          data-active-month={i.currentMonth}
          data-date={i.date.toString()}
          key={i.date}
          onClick={changeDate}
        >
          {getDayOfMonth(i.date)}
        </div>
        {getTodos(i.date)}
        <button onClick={handleClick} className="add-indicator-on-day">
          +
        </button>
      </article>
    );
  });
  return <section className="monthly-spread">{monthDates}</section>;
};
export default DateIndicator;
