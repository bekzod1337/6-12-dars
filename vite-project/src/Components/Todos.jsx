import React, { useState, useContext } from "react";
import { TodoContext } from "../TodoContext";

const TodoApp = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [newTodoText, setNewTodoText] = useState("");
  const [editTodoText, setEditTodoText] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      const newTodo = { id: Date.now(), text: newTodoText, completed: false };
      dispatch({ type: "ADD_TODO", payload: newTodo });
      setNewTodoText("");
    }
  };

  const handleEditTodo = () => {
    if (editTodoText.trim()) {
      dispatch({
        type: "UPDATE_TODO",
        payload: { id: editTodoId, text: editTodoText }
      });
      setEditTodoText(""); 
      setEditTodoId(null); 
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const handleToggleTodo = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4">
      <div className="mb-4">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          className="border p-2 w-full"
          placeholder="Add new todo"
        />
        <button
          onClick={handleAddTodo}
          className="mt-2 bg-blue-500 text-white px-4 py-2 w-full"
        >
          Add Todo
        </button>
      </div>

      <div className="space-y-4">
        {state.todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between border-b pb-2"
          >
            {editTodoId === todo.id ? (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={editTodoText}
                  onChange={(e) => setEditTodoText(e.target.value)}
                  className="border p-2 w-2/3"
                />
                <button
                  onClick={handleEditTodo}
                  className="bg-green-500 text-white px-4 py-2"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                  className="h-5 w-5"
                />
                <span
                  className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => {
                    setEditTodoId(todo.id);
                    setEditTodoText(todo.text);
                  }}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
