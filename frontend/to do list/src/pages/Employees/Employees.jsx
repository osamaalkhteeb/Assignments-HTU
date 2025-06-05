import NewEmployee from "./components/NewEmployess";
import Employee from "./components/Employee";
import { useState } from "react";

function Employees() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "osama", job: "developer", active: true },
    { id: 2, name: "sara", job: "designer", active: false },
    { id: 3, name: "nour", job: "developer", active: true },
    { id: 4, name: "ali", job: "designer", active: false },
  ]);

  const listOfData = employees.map((item, index) => (
    <Employee key={index} data={item} />
  ));

  const handleNewEmployee = (employee) => {
    setEmployees((prevEmployees) => [employee, ...prevEmployees]);
  };
  return (
    <div className="employees">
      <NewEmployee onEmployeeAdded={handleNewEmployee} />

      <div className="employees_list card">{listOfData}</div>
    </div>
  );
}

export default Employees;
