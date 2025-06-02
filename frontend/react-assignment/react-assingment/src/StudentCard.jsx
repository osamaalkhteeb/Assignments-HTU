import PropTypes from "prop-types";
import AlertButton from './AlertButton';

function StudentCard({name,grade}) {
    const badge = grade >= 85 ? "Excellent Student" : "Needs Improvement";
  const alertMessage = `Student: ${name} — Grade: ${grade}`;
   return (
          <div>
      <h2>Name: {name}</h2>
      <p>Grade :{grade} </p>
      <strong> Badge: {badge}</strong>
      <AlertButton message={alertMessage} />

    </div>
      )
}

StudentCard.propTypes  = {
  name: PropTypes.string,
  grade: PropTypes.number,
};
export default StudentCard;