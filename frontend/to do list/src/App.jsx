import { useState } from 'react'
import Employees from './pages/Employees/Employees'
import './App.css'
import Todos from './pages/todolist/Todos'
import ComponentA from './components/ComponentA'



function App() {

  return (
    <>
      {/* < Employees />
      <Todos/> */}
      <div className='box'>
      < ComponentA />
      </div>
    </>
  )
}

export default App
