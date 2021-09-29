import TodoItem from '../Todo/TodoItem';
import {
  getFullDate,
  getReadableMonth,
  getReadableDay,
} from '../../utils/moment-utils';
import './CalenderDay.css';

const CalendarDay = ({ selectDate, todos, onDelete, onToggle }) => {
  const getTodos = (selectDate, todos) => {
    const toDaysTodos = todos.filter(
      (todo) => getFullDate(todo.date) === getFullDate(selectDate)
    );
    return toDaysTodos.map((todo) => (
      <TodoItem
        key={`${todo.date}${todo._id}`}
        todo={todo}
        onDelete={onDelete}
        onToggle={onToggle}
      />
    ));
  };
  return (
    <section className="selected-day-container">
      <div className="selected-day-info">
        <h3 className="selected-day-title">Choosen day</h3>
        <h4 className="selected-day-second-title">
          {getReadableDay(selectDate)}
        </h4>
        <p className="selected-day-month">{getReadableMonth(selectDate)}</p>
      </div>
      <ul className="selected-day-todos">{getTodos(selectDate, todos)}</ul>
    </section>
  );
};

export default CalendarDay;
