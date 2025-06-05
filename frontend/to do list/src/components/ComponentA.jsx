import ComponentB from "./ComponentB";
import { createContext } from "react";
export const NameContext = createContext();


function ComponentA() {
    const name = "osama"

    return<div className='box'>ComponentA
    <NameContext.Provider value={name}>< ComponentB  /></NameContext.Provider>
      
      </div>
}

export default ComponentA;
