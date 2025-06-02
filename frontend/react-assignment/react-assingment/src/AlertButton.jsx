import PropTypes from "prop-types";

function AlertButton({ message }) {
  return <button onClick={() => alert(message)}>Show Info</button>;
}

AlertButton.propTypes = {
  message: PropTypes.string.isRequired,
};

export default AlertButton;