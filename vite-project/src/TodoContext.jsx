import { createContext, useReducer } from "react";

const initialState = {
  todos: []
};

const TodoContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return { ...state, todos: [...state.todos, action.payload] };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case "DELETE_TODO":
      return { ...state, todos: state.todos.filter(todo => todo.id !== action.payload) };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
        )
      };
    default:
      return state;
  }
};

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
