function TableData({ col = [], data = [] }) {
  const colList = col.map((c) => <th key={c.key}>{c.lable}</th>);
  
   const dataList = data.map((dataItem, index) => (
    <tr key={dataItem.id || index}>
      {col.map((c) => (
        <td key={c.key}>{dataItem[c.key]}</td>
      ))}
    </tr>
  ));
 
  return (
    <table className="table">
      <thead>
        <tr>{colList}</tr>
      </thead>
      <tbody>{dataList}</tbody>
    </table>
  );
}
export default TableData;