/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <inputf
      label="Buscar"
      type="text"
      placeholder="Buscar"
      size="lg"
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default Search;
