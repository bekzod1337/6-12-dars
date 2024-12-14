import React from "react";
import { TodoProvider } from "./TodoContext";
import TodoApp from "./Components/Todos";
function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}

export default App;
