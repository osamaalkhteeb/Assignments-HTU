import { useState } from "react";

function NewEmployee(props) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("Developer");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleJobChange = (e) => {
    setJob(e.target.value);
  };
  const addNewEmployee = (e) => {
    e.preventDefault();
    if (!name) {
      alert("Name is required");
      return;
    }
    const employee = {
      id: new Date().getTime(),
      name,
      job,
      active: true,
    };

    props.onEmployeeAdded(employee);
  };

  return (
    <div className="employee__new card">
      <h2> Add new Employee</h2>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            placeholder="new employee"
            onChange={(event) => handleNameChange(event)}
          />
        </div>

        <div>
          <label htmlFor="job">Job</label>
          <select
            id="job"
            value={job}
            onChange={(event) => handleJobChange(event)}
          >
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(event) => addNewEmployee(event)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewEmployee;
