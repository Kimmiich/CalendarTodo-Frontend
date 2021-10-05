import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './app.css';
import Errorboundary from './utils/Errorboundary';

//Import of todocomponents and functions
import {
  createTodoDb,
  updateTodoDb,
  deleteTodoDb,
  getAllTodosDb,
  getHolidayApi,
} from './utils/APIHelper';
import TodoList from './components/Todo/TodoList';
import AddTodo from './components/Todo/AddTodo';

//Calendar-components
import CalendarDay from './components/Calendar/CalenderDay';
import WeekdayIndicator from './components/Calendar/WeekdayIndicator';
import DateIndicator from './components/Calendar/DateIndicator';
import MonthIndicator from './components/Calendar/MonthIndicator';

//The main Component/App
const App: React.FC = () => {
  interface ITodo {
    text: string;
    date: Date;
    completed: boolean;
    _id: number;
  }

  interface IHolidays {
    dagar: string;
  }

  const [todos, setTodos] = useState<ITodo[]>([]);
  const [selectDate, setSelectDate] = useState<Date>(moment().toDate());

  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [holidays, setHolidays] = useState<IHolidays[]>([]);
  const [yearMonth, setYearMonth] = useState<string>(
    moment(selectDate).format('YYYY/MM')
  );

  //Fetch to database. Same as componentDidMount and ComponentDidUpdate
  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const gotTodos = await getAllTodosDb();
      setTodos(gotTodos);
    };
    fetchTodoAndSetTodos();
  }, []);

  //Fetch api
  useEffect(() => {
    const fetchHolidaysAndSetHolidays = async () => {
      const holidays = await getHolidayApi(yearMonth);
      setHolidays(holidays);
    };
    fetchHolidaysAndSetHolidays();
  }, [yearMonth]);

  //Eventhandler that calls fetchfunction: Sends new task to db
  const createTodo = async (todo: { text: string; day: string }) => {
    let newTodo = {
      task: todo.text,
      date: todo.day,
    };
    const response = await createTodoDb({ newTodo });
    setTodos([...todos, response]);
  };

  //Eventhandler that calls fetchfunction, deletes task
  const deleteTodo = async (_id: number) => {
    try {
      await deleteTodoDb(_id);
      setTodos(todos.filter(({ _id: i }) => _id !== i));
    } catch (err) {}
  };

  //Eventhandler that calls fetchfunction: Update task in db
  const updateTodo = async (_id: number) => {
    const value: any = todos.find((todo) => todo._id === _id);
    // e.stopPropagation();
    const payload = {
      _id: _id,
      completed: !value.completed,
    };
    const updatedTodo = await updateTodoDb({ payload });
    setTodos(todos.map((todo) => (todo._id === _id ? updatedTodo : todo)));
  };

  return (
    <Errorboundary>
      <MonthIndicator
        selectDate={selectDate}
        setSelectDate={setSelectDate}
        setYearMonth={setYearMonth}
      />
      <main className="main-container">
        <aside className="aside-content">
          <CalendarDay
            todos={todos}
            selectDate={selectDate}
            onDelete={deleteTodo}
            onToggle={updateTodo}
          />
          <AddTodo
            day={day}
            setDay={setDay}
            text={text}
            setText={setText}
            onAdd={createTodo}
          />
          <TodoList onDelete={deleteTodo} onToggle={updateTodo} todos={todos} />
        </aside>
        <main className="main-content">
          <WeekdayIndicator />
          <DateIndicator
            selectDate={selectDate}
            setSelectDate={setSelectDate}
            setDay={setDay}
            todos={todos}
            holidays={holidays}
          />
        </main>
      </main>
    </Errorboundary>
  );
};

export default App;
