/* eslint-disable react/prop-types */
import React from "react";

const SelectAndInput = ({
  label,
  name,
  fieldSelect,
  fieldDesc,
  listOptions,
  onChange
}) => {
  const nameSelect = name + "_" + fieldSelect;
  const nameDesc = name + "_" + fieldDesc;
  return (
    <div className="container col-0">
      <div className="row">
        <label htmlFor={nameSelect}>{label}</label>
        <select
          id={nameSelect}
          name={nameSelect}
          onChange={onChange}
          className={"form-control"}
        >
          <option value="" />
          {listOptions.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className="row">
        <label htmlFor={nameDesc}>{"Descrição"}</label>
        <input
          name={nameDesc}
          id={nameDesc}
          onChange={onChange}
          className="form-control"
        />
      </div>
    </div>
  );
};
export default SelectAndInput;
