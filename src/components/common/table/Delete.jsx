/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from "react";
import { withBaseIcon } from 'react-icons-kit';
import {bin} from 'react-icons-kit/icomoon/bin';

const SideIconContainer =withBaseIcon({ size: 20});

const Delete = () => {
  return (
    <SideIconContainer icon={bin}/>
  );
};

export default Delete;
