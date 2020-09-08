import React from 'react';
import './style.css';

const FormInput = (props) => {
  return (
    <div className="form-element">
      <label className="form-element-label">{props.label}</label>
      <span className="form-element-input-wrapper">
      <input
        onChange={props.onChange}
        type={props.type || 'text'}
        className="form-element-input"
        name={props.name}
        value={props.value}
      />
      <img src={props.icon} className="form-input-icon" alt="icon" />
      </span>

    </div>
  );
};

export default FormInput;
