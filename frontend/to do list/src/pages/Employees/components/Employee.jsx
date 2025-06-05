
function Employee(props){
return (
    <div className="employee employee-primary">
        <h3>{props.data.name}</h3>
        <small>{props.data.job}</small>
        <br />
        <i> {props.data.active ? 'Active' : 'Inactive'} </i>
    </div>
)

}

export default Employee;