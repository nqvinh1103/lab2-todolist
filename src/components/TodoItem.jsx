import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  isEditing,
  setEditTodoId,
}) {
  const [editText, setEditText] = useState(todo.text);

  return (
    <li
      className="flex justify-between items-center p-2 border-b"
      data-testid={`todo-item-${todo.id}`} // Thêm test id theo id để phân biệt
    >
      {isEditing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="border p-1 flex-1"
            data-testid={`edit-input-${todo.id}`} // Test id cho input edit
          />
          <button
            onClick={() => onEdit(todo.id, editText)}
            className="bg-green-500 text-white p-1 rounded"
            data-testid={`save-todo-${todo.id}`} // Test id cho nút save
          >
            Save
          </button>
        </>
      ) : (
        <>
          <span
            onClick={() => onToggle(todo.id)}
            className={`flex-1 cursor-pointer ${
              todo.completed ? "line-through" : ""
            }`}
            data-testid={`todo-text-${todo.id}`} // Test id cho text
          >
            {todo.text}
          </span>
          <button
            onClick={() => setEditTodoId(todo.id)}
            data-testid={`edit-todo-${todo.id}`} // Test id cho nút edit
          >
            <Pencil />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            data-testid={`delete-todo-${todo.id}`} // Test id cho nút delete
          >
            <Trash2 />
          </button>
        </>
      )}
    </li>
  );
}
