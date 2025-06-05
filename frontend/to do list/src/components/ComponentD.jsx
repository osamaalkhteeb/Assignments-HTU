import { useContext } from "react";
import { NameContext } from "./ComponentA";

function ComponentD() {
  const name = useContext(NameContext);
  return <div className="box">ComponentD {name}</div>;
}

export default ComponentD;
