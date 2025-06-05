import { useContext } from "react";
import ComponentD from "./ComponentD";
import { NameContext } from "./ComponentA";

function ComponentC() {
const name = useContext(NameContext);
    return <div className='box'>ComponentC
    {name}
      < ComponentD />
      </div>
}

export default ComponentC;
