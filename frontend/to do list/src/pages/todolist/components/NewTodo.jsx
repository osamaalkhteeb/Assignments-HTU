import { useState } from "react";

function NewTodo(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const todo = {
      id: Date.now(),
      title,
      description,
    };

    props.onAddTodo(todo);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="todo__new card">
      <h2>Add New Todo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todo title"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Todo description"
          />
        </div>
        <button className="btn btn-primary" type="submit">Add Todo</button>
      </form>
    </div>
  );
}

export default NewTodo;
