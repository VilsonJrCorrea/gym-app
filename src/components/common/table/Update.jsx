/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from "react";
import { withBaseIcon } from 'react-icons-kit';
import {pencil} from 'react-icons-kit/icomoon/pencil';

const SideIconContainer =withBaseIcon({ size: 20});

const Update = () => {
  return (
    <SideIconContainer icon={pencil}/>
  );
};

export default Update;
