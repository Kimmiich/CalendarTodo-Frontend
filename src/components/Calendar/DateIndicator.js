import {
  getDayOfMonth,
  getFullDate,
  getMonth,
  getYear,
  getDatesInMonthDisplay,
} from '../../utils/moment-utils';
import './DateIndicator.css';
// import TodoItem from '../Todo/TodoItem';

const DateIndicator = ({
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
      getFullDate(selectDate) === getFullDate(i.date) ? 'selected' : ' ';
    const active = getFullDate() === getFullDate(i.date) ? 'active' : ';';

    const getHoliday = (selectDate) => {
      if (holidays.dagar) {
        const value = holidays.dagar;
        const todaysHolidays = value.filter(
          (holiday) => getFullDate(holiday.datum) === getFullDate(selectDate)
        );

        return todaysHolidays.map((day) => {
          return day.helgdag ? (
            <p key={day.helgdag} className="holiday">
              {day.helgdag}
            </p>
          ) : (
            console.log('nope')
          );
        });
      }
    };

    const getTodos = (selectDate) => {
      const toDaysTodos = todos.filter(
        (todo) => getFullDate(todo.date) === getFullDate(selectDate)
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
      <article key={getFullDate(i.date)} className="day-container">
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

        <div className="btn-and-tasks" id={getFullDate(i.date)}>
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
