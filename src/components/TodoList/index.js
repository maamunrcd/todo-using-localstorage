import { useEffect, useState } from "react";
import "./index.css";

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");

    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  const [selectedTodo, setSelectedTodo] = useState(null);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };
  const selectUpdateTodo = (id) => {
    setSelectedTodo(id);
    setTodo(todos.filter((item) => item.id === id).map(ele=>ele.text));
  };

  const deleteTodo = (id) => {
    let todosItems = [...todos];
    setTodos(todosItems.filter((item) => item.id !== id));
  };

  const handleFormSubmit = (e)=> {
    e.preventDefault();

    if (todo !== "" && !selectedTodo) {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo,
        },
      ]);
    } else {
      let todosItems = [...todos];
      const todoItem = todosItems.findIndex((item) => item.id === selectedTodo);
      todosItems[todoItem].text = todo;
      setSelectedTodo(null);
      setTodos(todosItems);
    }
    setTodo("");
  }

  return (
    <div className="todoWrapper">
        <h6 className="pageTitle">Todo List</h6>
      <form className="todoForm" onSubmit={handleFormSubmit}>
        <input
          name="todo"
          type="text"
          placeholder="Create a new todo"
          value={todo}
          onChange={handleInputChange}
        />
        <button type="submit">Save</button>
      </form>
      <ul className="todoList">
        {todos.map((todo) => (
          <li className="listItem" key={todo.id}>
            <span className="listText">{todo.text}</span>
            <span className="actions">
              <span onClick={() => selectUpdateTodo(todo.id)}>Edit</span>
              <span
                onClick={() => deleteTodo(todo.id)}>
                Delete
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
