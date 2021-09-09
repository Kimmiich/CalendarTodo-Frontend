import React from 'react';
import moment from 'moment';
import TodoItem from '../Todo/TodoItem';

const CalendarDay = ({ selectDate, todos, onDelete, onToggle }) => {
  const getTodos = (selectDate, todos) => {
    const toDaysTodos = todos.filter(
      (todo) =>
        moment(todo.date).format('YYYY-MM-DD') ===
        moment(selectDate).format('YYYY-MM-DD')
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
        <h3 className="selected-day-title">Today</h3>
        <h4 className="selected-day-second-title">
          {moment(selectDate).format('dddd - Do')}
        </h4>
        <p className="selected-day-month">
          {moment(selectDate).format('MMMM')}
        </p>
      </div>
      <ul className="selected-day-todos">{getTodos(selectDate, todos)}</ul>
    </section>
  );
};

export default CalendarDay;
