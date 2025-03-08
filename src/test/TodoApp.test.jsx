import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import TodoApp from "../components/TodoApp";

describe("TodoApp", () => {
  test("should add a new todo", () => {
    render(<TodoApp />);

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    const todoId = Date.now(); // This will be close to the actual ID
    const todoText = screen.getByTestId(`todo-text-${todoId}`);
    expect(todoText).toHaveTextContent("New Task");
  });

  test("should mark a todo as completed", () => {
    render(<TodoApp />);

    // Add a new todo first
    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    fireEvent.change(input, { target: { value: "Complete Task" } });
    fireEvent.click(addButton);

    const todoId = Date.now(); // This will be close to the actual ID
    const checkbox = screen.getByTestId(`todo-checkbox-${todoId}`);
    const todoText = screen.getByTestId(`todo-text-${todoId}`);

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(todoText).toHaveClass("line-through");
  });

  test("should remove a todo", () => {
    render(<TodoApp />);

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    fireEvent.change(input, { target: { value: "Delete Task" } });
    fireEvent.click(addButton);

    const todoId = Date.now(); // This will be close to the actual ID
    const deleteButton = screen.getByTestId(`delete-todo-${todoId}`);
    const todoText = screen.getByTestId(`todo-text-${todoId}`);

    fireEvent.click(deleteButton);

    expect(todoText).not.toBeInTheDocument();
  });

  test("should edit a todo", () => {
    render(<TodoApp />);

    // Add a new todo
    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-todo-button");

    fireEvent.change(input, { target: { value: "Original Task" } });
    fireEvent.click(addButton);

    const todoId = Date.now(); // This will be close to the actual ID
    const editButton = screen.getByTestId(`edit-todo-${todoId}`);

    // Click edit button
    fireEvent.click(editButton);

    // Input should now have the original text
    expect(input).toHaveValue("Original Task");

    // Change the text
    fireEvent.change(input, { target: { value: "Updated Task" } });
    fireEvent.click(addButton);

    // Verify the text was updated
    const todoText = screen.getByTestId(`todo-text-${todoId}`);
    expect(todoText).toHaveTextContent("Updated Task");
  });
});
