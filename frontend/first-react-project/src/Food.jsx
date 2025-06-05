function Food() {
  
  

  const foodList = food.map((p) => <li key={p.id}>{p.name}</li>);
  const vegatablesList = vegatables.map((p) => <li key={p.id}>{p.name}</li>);
  return (
  <>
  <ul>{foodList}</ul>;

  <ul>{vegatablesList} </ul>
  </>
  )}
export default Food;
