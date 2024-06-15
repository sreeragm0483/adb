import React, { useState, useEffect } from "react";
import "./App.css";
import { getTodos, updateTodo } from "./api";

export function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      const result = await getTodos();
      if (result.error) {
        setError(result.error);
      } else {
        setTodos(result.todos);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo) {
      try {
        const result = await updateTodo(newTodo);
        if (result.error) {
          setError(result.error);
        } else {
          setTodos(result.todos);
          setNewTodo("");
        }
      } catch (error) {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="App">
      {error && (
        <div className="ErrorPopup">
          <h5>{error}</h5>
        </div>
      )}
      <div className="TodoList">
        <h1>List of TODOs</h1>
        <div>
          {todos &&
            todos.map((todo, index) => <h5 key={index}>{todo.todo}</h5>)}
        </div>
      </div>
      <div className="CreateTodo">
        <h1>Create a ToDo</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="todo">ToDo:</label>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button type="button" onClick={handleAddTodo}>
              Add ToDo!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
