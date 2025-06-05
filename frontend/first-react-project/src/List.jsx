function List(items = []) {
  const foodList = items.map((p) => <li key={p.id}>{p.name}</li>);

  return (
  <>
  <ul>{foodList}</ul>;

  </>
  )
}
export default List;
