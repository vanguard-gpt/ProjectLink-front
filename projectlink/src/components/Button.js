import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './styles.css'; // 스타일을 위한 CSS 파일

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