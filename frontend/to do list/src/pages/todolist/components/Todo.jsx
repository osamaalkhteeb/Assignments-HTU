function Todo(props) {
  return (
    <div className="todo card">
      <h3>{props.data.title}</h3>
      <p>{props.data.description}</p>
    </div>
  );
}

export default Todo;
