import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import todoService from "../services/todoService";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await todoService.getAllTodos();
      setTodos(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError(error.response?.data?.message || "Failed to fetch todos");
      setLoading(false);
    }
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() === "") return;
    try {
      if (editId) {
        const updatedTodo = {
          text: newTodo,
          completed: todos.find((t) => t.id === editId)?.completed || false,
        };
        const response = await todoService.updateTodo(
          Number(editId),
          updatedTodo
        );
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === editId ? response : todo))
        );
        setEditId(null);
      } else {
        const newTodoItem = {
          text: newTodo,
          completed: false,
        };
        const createdTodo = await todoService.createTodo(newTodoItem);
        setTodos((prevTodos) => [...prevTodos, createdTodo]);
      }
      setNewTodo("");
      setError(null);
    } catch (error) {
      console.error("Error saving todo:", error);
      setError(error.response?.data?.message || "Failed to save todo");
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);
      const updatedTodo = {
        text: todo.text,
        completed: !todo.completed,
      };
      const response = await todoService.updateTodo(Number(id), updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? response : todo))
      );
      setError(null);
    } catch (error) {
      console.error("Error updating todo:", error);
      setError(error.response?.data?.message || "Failed to update todo");
    }
  };

  const handleEdit = (todo) => {
    setNewTodo(todo.text);
    setEditId(todo.id);
    setError(null);
  };

  const handleDelete = async (id) => {
    try {
      if (!id) {
        setError("Invalid todo ID");
        return;
      }
      await todoService.deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setError(null);
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError(error.response?.data?.message || "Failed to delete todo");
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      data-testid="todo-app"
    >
      <h1
        className="text-2xl font-bold mb-4 text-center"
        data-testid="todo-title"
      >
        Todo List
      </h1>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
      )}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
          data-testid="todo-input"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          data-testid="add-todo-button"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>
      <ul className="space-y-2" data-testid="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center gap-3 bg-gray-100 p-3 rounded-lg ${
              todo.completed ? "opacity-75" : ""
            }`}
            data-testid={`todo-item-${todo.id}`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
              className="w-5 h-5"
              data-testid={`todo-checkbox-${todo.id}`}
            />
            <span
              className={`flex-1 ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
              data-testid={`todo-text-${todo.id}`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleEdit(todo)}
              data-testid={`edit-todo-${todo.id}`}
            >
              <Pencil className="w-5 h-5 text-blue-500" />
            </button>
            <button
              onClick={() => handleDelete(todo.id)}
              data-testid={`delete-todo-${todo.id}`}
            >
              <Trash2 className="w-5 h-5 text-red-500" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
