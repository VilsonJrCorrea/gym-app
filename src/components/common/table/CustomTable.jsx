/* eslint-disable react/prop-types */
import React from "react";
import CustomTableBody from "./CustomTableBody";
import CustomTableHead from "./CustomTableHead";

const CustomTable = ({ columns, data, onModalChange, onDelete, onUpdate }) => {
  return (
    <table className="table">
      <CustomTableHead columns={columns} />
      <CustomTableBody
        data={data}
        columns={columns}
        onModalChange={onModalChange}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </table>
  );
};
export default CustomTable;
