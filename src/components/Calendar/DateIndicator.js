import React from 'react';
import {
  getDayOfMonth,
  getMonthDayYear,
  getMonth,
  getYear,
} from '../../utils/moment-utils';
import { getDatesInMonthDisplay } from '../../utils/date-utils';
import moment from 'moment';
import './DateIndicator.css';
// import TodoItem from '../Todo/TodoItem';

const DateIndicator = ({
  activeDates,
  selectDate,
  setSelectDate,
  todos,
  setDay,
  holidays,
}) => {
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

    const getHoliday = (selectDate) => {
      if (holidays.dagar) {
        const value = holidays.dagar;
        const todaysHolidays = value.filter(
          (holiday) =>
            moment(holiday.datum).format('YYYY-MM-DD') ===
            moment(selectDate).format('YYYY-MM-DD')
        );

        todaysHolidays.map((day) => {
          return day.helgdag ? console.log(day.helgdag) : console.log('nope');
        });
      }

      // const helgdag = todaysHolidays.filter((value) => value + '.helgdag');

      // console.log('helgdag: ' + helgdag);
    };

    // const getHolidays = (selectDate) => {
    //   const value = holidays.dagar;
    //   const todaysHolidays = value.filter(
    //     (holiday) =>
    //       moment(holiday.datum).format('YYYY-MM-DD') ===
    //       moment(selectDate).format('YYYY-MM-DD')
    //   );

    //   todaysHolidays.map((hol) => <p className="day-holiday">{hol.helgdag}</p>);
    // };
    // if (holidays.dagar) {
    //   const jaja = holidays.dagar;
    //   jaja.map((day) => {
    //     return console.log(day.helgdag ? day.helgdag : 'nope');
    //   });
    //  }

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
        {getHoliday(i.date)}
        <div className="btn-and-tasks" id={moment(i.date).format('YYYY-MM-DD')}>
          {getTodos(i.date)}
          <button onClick={handleClick} className="add-indicator-on-day">
            +
          </button>
        </div>
      </article>
    );
  });
  return <section className="monthly-spread">{monthDates}</section>;
};
export default DateIndicator;
