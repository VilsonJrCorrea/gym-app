/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prop-types */
import React from 'react';

const Select = ({ label, name, fieldSelect, listOptions, disabled, onChange }) => {
  const nameSelect = `${name}_${fieldSelect}`;
  return (
    <div className="container-fluid">
      <div className="row">
        <label htmlFor={nameSelect}>{label}</label>
        <select id={nameSelect} name={nameSelect} onChange={onChange} className="form-control" disabled={disabled}>
          {/* <option value="" /> */}
          {listOptions.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default Select;
