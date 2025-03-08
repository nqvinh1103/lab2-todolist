// import "@testing-library/jest-dom";
// import { fireEvent, render, screen } from "@testing-library/react";
// import TodoApp from "../components/TodoApp";

// jest.spyOn(window, "alert").mockImplementation(() => {}); // mock alert nếu cần

// describe("TodoApp", () => {
//   test("renders initial todo list with input and button", () => {
//     render(<TodoApp />);

//     expect(screen.getByTestId("todo-input")).toBeInTheDocument();
//     expect(screen.getByTestId("add-button")).toBeInTheDocument();
//     expect(screen.getByTestId("todo-list")).toBeInTheDocument();
//   });

//   test("can add a new todo", () => {
//     render(<TodoApp />);

//     const input = screen.getByTestId("todo-input");
//     const addButton = screen.getByTestId("add-button");

//     fireEvent.change(input, { target: { value: "Learn Testing" } });
//     fireEvent.click(addButton);

//     expect(screen.getByText("Learn Testing")).toBeInTheDocument();
//   });

//   test("does not add empty todo", () => {
//     render(<TodoApp />);

//     const addButton = screen.getByTestId("add-button");
//     fireEvent.click(addButton);

//     expect(window.alert).toHaveBeenCalledWith("Todo cannot be empty");
//   });

//   test("can mark todo as complete and incomplete", () => {
//     render(<TodoApp />);

//     const input = screen.getByTestId("todo-input");
//     const addButton = screen.getByTestId("add-button");

//     fireEvent.change(input, { target: { value: "Test Checkbox" } });
//     fireEvent.click(addButton);

//     const todoText = screen.getByTestId("todo-text-0");
//     expect(todoText).not.toHaveClass("line-through");

//     fireEvent.click(todoText);
//     expect(todoText).toHaveClass("line-through");

//     fireEvent.click(todoText);
//     expect(todoText).not.toHaveClass("line-through");
//   });

//   test("can edit a todo", () => {
//     render(<TodoApp />);

//     const input = screen.getByTestId("todo-input");
//     const addButton = screen.getByTestId("add-button");

//     fireEvent.change(input, { target: { value: "Old Todo" } });
//     fireEvent.click(addButton);

//     const editButton = screen.getByTestId("edit-todo-0");
//     fireEvent.click(editButton);

//     const editInput = screen.getByTestId("edit-input-0");
//     fireEvent.change(editInput, { target: { value: "Updated Todo" } });

//     const saveButton = screen.getByTestId("save-todo-0");
//     fireEvent.click(saveButton);

//     expect(screen.getByText("Updated Todo")).toBeInTheDocument();
//     expect(screen.queryByText("Old Todo")).not.toBeInTheDocument();
//   });

//   test("can delete a todo", () => {
//     render(<TodoApp />);

//     const input = screen.getByTestId("todo-input");
//     const addButton = screen.getByTestId("add-button");

//     fireEvent.change(input, { target: { value: "To Be Deleted" } });
//     fireEvent.click(addButton);

//     const deleteButton = screen.getByTestId("delete-todo-0");
//     fireEvent.click(deleteButton);

//     expect(screen.queryByText("To Be Deleted")).not.toBeInTheDocument();
//   });

//   test("handles multiple todos correctly", () => {
//     render(<TodoApp />);

//     const input = screen.getByTestId("todo-input");
//     const addButton = screen.getByTestId("add-button");

//     fireEvent.change(input, { target: { value: "Todo 1" } });
//     fireEvent.click(addButton);

//     fireEvent.change(input, { target: { value: "Todo 2" } });
//     fireEvent.click(addButton);

//     fireEvent.change(input, { target: { value: "Todo 3" } });
//     fireEvent.click(addButton);

//     expect(screen.getByText("Todo 1")).toBeInTheDocument();
//     expect(screen.getByText("Todo 2")).toBeInTheDocument();
//     expect(screen.getByText("Todo 3")).toBeInTheDocument();
//   });
// });
