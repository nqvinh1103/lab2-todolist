import axios from "axios";

const API_BASE_URL = "http://localhost:8080/list"; // Updated to match Spring Boot endpoint

// Tạo instance axios với cấu hình mặc định
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const todoService = {
  getAllTodos: async () => {
    try {
      const response = await api.get();
      return response.data;
    } catch (error) {
      console.error("Error fetching todos:", error);
      throw error;
    }
  },

  createTodo: async (todo) => {
    try {
      const response = await api.post("", {
        text: todo.text,
        completed: todo.completed || false,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  },

  updateTodo: async (id, todo) => {
    try {
      const response = await api.put(`/${id}`, {
        text: todo.text,
        completed: todo.completed,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  },

  deleteTodo: async (id) => {
    try {
      await api.delete(`/${id}`);
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  },

  toggleTodoComplete: async (id) => {
    const response = await api.patch(`/todos/${id}/toggle`);
    return response.data;
  },
};

export default todoService;
