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
      {/* <label>{label}</label> */}
      {inputs.type === 'radio' && inputs.name === 'conceptName' ? (
        <fieldset>
          <legend>Select one</legend>

          <div className="input-radio">
            <label>{label}</label>
            <input
              type="radio"
              id="months"
              name="conceptName"
              value="months"
              onChange={onChange}
            />
            <label htmlFor="months">Month(s)</label>
          </div>

          <div className="input-radio">
            <label>{label}</label>
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
      ) : inputs.type === 'radio' && inputs.name === 'gender' ? (
        <fieldset>
          <legend>Select one</legend>

          <div className="input-radio">
            <label>{label}</label>
            <input
              type="radio"
              id="Male"
              name="gender"
              value="Male"
              onChange={onChange}
            />
            <label htmlFor="months">Male</label>
          </div>

          <div className="input-radio">
            <label>{label}</label>
            <input
              type="radio"
              id="Female"
              name="gender"
              value="Female"
              onChange={onChange}
            />
            <label htmlFor="gender">Female</label>
          </div>
        </fieldset>
      ) : (
        <div className="form-group">
          <label>{label}</label>
          <input
            // className="input-others"
            placeholder={placeholder}
            onBlur={handleFocus} // leave
            autoComplete="off"
            onFocus={() =>
              inputs.name === 'confirmPassword' && setFocused(true)
            } // enter
            focused={focused.toString()}
            {...inputs}
            onChange={onChange}
          />
        </div>
      )}

      {/* <span>{errorMessage}</span> */}
    </div>
  );
};

export default FormInput;
