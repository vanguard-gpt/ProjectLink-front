import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.css'; 

const Button = ({ text, to}) => {
  return (
    <Link to={to} className={`btn`}>
      {text}
    </Link>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
};

export default Button;