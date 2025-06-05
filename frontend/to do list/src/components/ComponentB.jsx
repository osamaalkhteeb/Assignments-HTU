import ComponentC from "./ComponentC";
import { useContext } from "react";
import { NameContext } from "./ComponentA";
function ComponentB() {
const name = useContext(NameContext);
    return <div className='box'>ComponentB
    {name}
      < ComponentC />
      </div>
}

export default ComponentB;
