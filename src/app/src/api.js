const apiUrl = process.env.REACT_APP_API_URL;

const getTodos = async () => {
  try {
    const response = await fetch(`${apiUrl}/todos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const todosData = await response.json();
    console.log(todosData);
    return { todos: todosData, error: null };
  } catch (error) {
    return { todos: null, error: error.message };
  }
};

const updateTodo = async (newTodo) => {
  try {
    const response = await fetch(`${apiUrl}/todos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: newTodo }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const updatedTodos = await response.json();
    return { todos: updatedTodos.todos, error: null };
  } catch (error) {
    return { todos: null, error: error.message };
  }
};

export { getTodos, updateTodo };
