import StudentCard from "./StudentCard";
import PropTypes from "prop-types";
function StudentList({ students }) {
  return (
    <div>
      {students.map((student) => (
        <StudentCard
          key={student.id}
          name={student.name}
          grade={student.grade}
        />
      ))}
    </div>
  );
}

StudentList.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      grade: PropTypes.number,
    })
  ).isRequired,
};

export default StudentList;