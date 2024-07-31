import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo_i from "../assets/logo_i.png";

const Card = ({ placeholders, buttonText, linkText, linkUrl, isButtonDisabled }) => {
  return (
    <div className="card-body">
      <div className="card">
        <div className="login-navbar">
          <Link to="/" className="nav-link">
            <img src={logo_i} alt={"홈페이지로 가기"} />
          </Link>
        </div>
        {placeholders.map((placeholder, index) => (
          <div className="form-group" key={index}>
            <input
              type={placeholder.type}
              placeholder={placeholder.text}
              name={placeholder.name}
              onChange={placeholder.onChange}
              className={placeholder.isValid === false ? 'invalid' : ''}
            />
            {placeholder.isValid === false && (
              <div className="error-message" style={{ color: 'red' }}>
                {placeholder.errorMessage}
              </div>
            )}
          </div>
        ))}
        <button  className={`card-btn${isButtonDisabled ? " button-disabled" : ""}`} type="submit" disabled={isButtonDisabled}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  placeholders: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      value: PropTypes.string,
      onChange: PropTypes.func.isRequired,
      isValid: PropTypes.bool,
      errorMessage: PropTypes.string
    })
  ).isRequired,
  buttonText: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  linkUrl: PropTypes.string,
  isButtonDisabled: PropTypes.bool
};

export default Card;
