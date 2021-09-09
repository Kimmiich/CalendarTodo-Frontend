//Npm package for cleaner post(etc) request.
import axios from 'axios';

const API_URL = 'https://kimmie-app-cal.herokuapp.com/todos/';

//Accepts a task object and sends a post to our API_URL and returns the newTodo.
export async function createTodoDb(task) {
  const { data: newTodo } = await axios.post(API_URL + 'new', task).then();
  return newTodo;
}

//Accepts an id and sends a delete request to our API.
export async function deleteTodoDb(_id) {
  const message = await axios.delete(`${API_URL}${_id}`);
  return message;
}

//Accepts an object containing id and completed value. Sends a Post request to update  todo.
export async function updateTodoDb(payload) {
  const { data: newTodo } = await axios.post(`${API_URL}`, payload).then();
  return newTodo;
}

//Fetching all the todos from our API via axios.get
export async function getAllTodosDb() {
  const { data: todos } = await axios.get(API_URL);
  return todos;
}

export async function getHolidayApi(yearMonth) {
  const { data: holidays } = await axios(
    `http://sholiday.faboul.se/dagar/v2.1/${yearMonth}`
  );

  return holidays;
}
