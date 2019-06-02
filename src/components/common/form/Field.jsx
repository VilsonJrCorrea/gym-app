/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';

const Field = ({ item, name, index, object, onChangeListOfObjects }) => {
  const value = object[item.path];
  const select = `${name}_${item.path}_${index}`;
  return (
    <div>
      <label htmlFor={item.path}>{item.label}</label>
      <input onChange={onChangeListOfObjects} name={select} value={value} className="form-control" id={item.path} />
    </div>
  );
};
export default Field;
