import React from 'react';
import TodoItem from './TodoItem';
import moment from 'moment';
import './TodoList.css';

function TodoList({ todos, onDelete, onToggle }) {
  //Sort the todos before printing them
  const sortedTodos = todos.sort((a, b) =>
    moment(b.date).format('DD-MM-YYYY') <= moment(a.date).format('DD-MM-YYYY')
      ? 1
      : -1
  );
  return (
    <section className="all-todos-container">
      <h3>All todos</h3>
      <p className="all-todos-text">Click on a todo to mark it as done!</p>
      <ul className="all-todos-list">
        {sortedTodos.map((todo) => (
          <TodoItem
            key={`${todo.date}${todo._id}`}
            todo={todo}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;
