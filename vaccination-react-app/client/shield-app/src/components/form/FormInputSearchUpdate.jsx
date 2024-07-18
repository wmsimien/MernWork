import React, { useState } from 'react';
import './formInput.css';

const FormInput = ({
  label,
  placeholder,
  errorMessage,
  onChange,
  id,
  ...inputs
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      {inputs.type === 'radio' ? (
        <fieldset>
          <legend>Select one</legend>

          <div>
            <input
              type="radio"
              id="months"
              name="conceptName"
              value="months"
              onChange={onChange}
            />
            <label htmlFor="months">Month(s)</label>
          </div>

          <div>
            <input
              type="radio"
              id="years"
              name="conceptName"
              value="years"
              onChange={onChange}
            />
            <label htmlFor="years">Year(s)</label>
          </div>
        </fieldset>
      ) : (
        <input
          placeholder={placeholder}
          onBlur={handleFocus} // leave
          onFocus={() => inputs.name === 'confirmPassword' && setFocused(true)} // enter
          focused={focused.toString()}
          {...inputs}
          onChange={onChange}
        />
      )}
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
