'use client';

import dynamic from 'next/dynamic';
import React from 'react';
const AppointmentMap = dynamic(() => import('./AppointmentMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-52 sm:h-80 overflow-hidden rounded-md animate-pulse bg-gray-300" />
  ),
});

const AppointmentMapWrapper = () => {
  return <AppointmentMap />;
};

export default AppointmentMapWrapper;
