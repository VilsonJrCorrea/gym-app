/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { withBaseIcon } from 'react-icons-kit';
import { cross } from 'react-icons-kit/icomoon/cross';

const SideIconContainer = withBaseIcon({ size: 20 });

const Delete = () => {
  return <SideIconContainer icon={cross} />;
};

export default Delete;
