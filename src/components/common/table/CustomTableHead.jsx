/* eslint-disable react/prop-types */
import React from 'react';

const CustomTableHead = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th key={column.path || column.key} align="left">
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};
export default CustomTableHead;
