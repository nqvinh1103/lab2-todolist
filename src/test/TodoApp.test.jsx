import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import TodoApp from "../components/TodoApp";

// Mock the entire todoService module
vi.mock("../services/todoService", () => ({
  default: {
    getAllTodos: vi.fn(() => Promise.resolve([])),
    createTodo: vi.fn((todo) => Promise.resolve({ ...todo, id: Date.now() })),
    updateTodo: vi.fn((id, todo) => Promise.resolve({ ...todo, id })),
    deleteTodo: vi.fn(() => Promise.resolve()),
  },
}));

describe("TodoApp", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render loading state initially", () => {
    render(<TodoApp />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should add a new todo", async () => {
    render(<TodoApp />);

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("New Task")).toBeInTheDocument();
    });
  });

  test("should mark a todo as completed", async () => {
    render(<TodoApp />);

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    fireEvent.change(input, { target: { value: "Complete Task" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      const todoText = screen.getByText("Complete Task");
      const checkbox = todoText.parentElement.querySelector(
        'input[type="checkbox"]'
      );

      fireEvent.click(checkbox);

      expect(checkbox).toBeChecked();
      expect(todoText.className).toContain("line-through");
    });
  });

  test("should remove a todo", async () => {
    render(<TodoApp />);

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    fireEvent.change(input, { target: { value: "Delete Task" } });
    fireEvent.click(addButton);

    await waitFor(async () => {
      const todoText = screen.getByText("Delete Task");
      const deleteButton =
        todoText.parentElement.querySelector("button:last-child");

      fireEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.queryByText("Delete Task")).not.toBeInTheDocument();
      });
    });
  });

  test("should edit a todo", async () => {
    render(<TodoApp />);

    // Wait for loading to finish
    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    fireEvent.change(input, { target: { value: "Original Task" } });
    fireEvent.click(addButton);

    await waitFor(async () => {
      const todoText = screen.getByText("Original Task");
      const editButton = todoText.parentElement.querySelector(
        "button:first-of-type"
      );

      fireEvent.click(editButton);

      expect(input).toHaveValue("Original Task");

      fireEvent.change(input, { target: { value: "Updated Task" } });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(screen.getByText("Updated Task")).toBeInTheDocument();
        expect(screen.queryByText("Original Task")).not.toBeInTheDocument();
      });
    });
  });
});
