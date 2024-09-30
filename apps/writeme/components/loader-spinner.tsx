'use client';

import React from 'react';
import {MagnifyingGlass} from 'react-loader-spinner';

function LoaderSpinner() {
  return (
    <MagnifyingGlass
      visible={true}
      height="80"
      width="80"
      ariaLabel="magnifying-glass-loading"
      wrapperStyle={{}}
      wrapperClass="magnifying-glass-wrapper"
      glassColor="#c0efff"
      color="#97a8ee"
    />
  );
}

export default LoaderSpinner;
