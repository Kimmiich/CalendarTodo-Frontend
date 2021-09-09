import React from 'react';
import { RiDeleteBinFill } from 'react-icons/ri';
import moment from 'moment';

function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <li
      onClick={(e) => onToggle(todo._id, todo.completed)}
      className={`todo ${todo.completed ? 'completed' : ''}`}
    >
      <RiDeleteBinFill
        className="bin-icon"
        onClick={() => onDelete(todo._id)}
      />
      <p className="todo-name">{todo.task}</p>{' '}
      <span className="todo-deadline">
        {moment(todo.date).format('YYYY-MM-DD')}
      </span>
    </li>
  );
}

export default TodoItem;
