function AddTodo({ onAdd, text, setText, day, setDay }) {
  const onSubmit = (e) => {
    e.preventDefault();

    if (!text || !day) {
      alert('Please add a task and deadline!');
      return;
    }
    onAdd({ text, day });

    setText('');
    setDay('');
  };

  return (
    <section className="add-todo-container">
      <h3 className="add-todo-title">New task</h3>
      <form className="todo-form" onSubmit={onSubmit}>
        <label>Task: </label>
        <input
          type="text"
          value={text}
          onChange={({ target }) => setText(target.value)}
          placeholder="Enter a task"
        />
        <label>Deadline: </label>
        <input
          type="date"
          value={day}
          onChange={({ target }) => setDay(target.value)}
        />
        <button className="add-btn" type="submit">
          Add
        </button>
      </form>
    </section>
  );
}

export default AddTodo;
