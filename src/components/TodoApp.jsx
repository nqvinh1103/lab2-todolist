import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React Testing", completed: false },
    { id: 2, text: "Write Unit Tests", completed: true },
    { id: 3, text: "Practice TDD", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: newTodo } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    }
    setNewTodo("");
  };

  const handleToggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEdit = (todo) => {
    setNewTodo(todo.text);
    setEditId(todo.id);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

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
          {editId ? "Update" : "+ Add"}
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
