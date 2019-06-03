/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { withBaseIcon } from 'react-icons-kit';
import {checkmark} from 'react-icons-kit/icomoon/checkmark'

const SideIconContainer = withBaseIcon({ size: 20 });

const Delete = () => {
  return <SideIconContainer icon={checkmark} />;
};

export default Delete;
