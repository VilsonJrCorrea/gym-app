/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/prop-types */
import React from 'react';

const SelectAndInput = ({ label, name, fieldSelect, fieldDesc, listOptions, onChange, disabled }) => {
  const nameSelect = `${name}_${fieldSelect}`;
  const nameDesc = `${name}_${fieldDesc}`;
  return (
    <div style={{ paddingTop: '20px' }} className="col col-12">
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
      <div className="row">
        <label htmlFor={nameDesc}>Descrição</label>
        <input name={nameDesc} id={nameDesc} onChange={onChange} className="form-control" disabled={disabled} />
      </div>
    </div>
  );
};
export default SelectAndInput;
