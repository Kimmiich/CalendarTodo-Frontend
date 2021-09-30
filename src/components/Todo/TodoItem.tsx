import React from 'react';
import { RiDeleteBinFill } from 'react-icons/ri';
import moment from 'moment';
import './TodoItem.css';

interface Props {
  todo: any;
  onDelete: (val1: string) => void;
  onToggle: (val1: string, val2: boolean) => void;
}

const TodoItem: React.FC<Props> = ({ todo, onDelete, onToggle }) => {
  console.log(todo);
  console.log(typeof todo);
  console.log(typeof todo._id);
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
};

export default TodoItem;
