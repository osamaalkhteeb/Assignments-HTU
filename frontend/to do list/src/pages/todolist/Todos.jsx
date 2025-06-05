import { useState } from "react";
import Todo from "./components/Todo";
import NewTodo from "./components/NewTodo";

function Todos() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Study React", description: "Learn about components and props" },
    { id: 2, title: "Do Homework", description: "Complete the math assignment" },
  ]);

  const handleAddTodo = (todo) => {
    setTodos((prevTodos) => [todo, ...prevTodos]);
  };

  return (
    <div className="todos">
      <NewTodo onAddTodo={handleAddTodo} />
      <div className="todos_list card">
        {todos.map((item) => (
          <Todo key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
}

export default Todos;
