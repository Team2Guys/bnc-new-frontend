'use client';

import React, { useEffect, useState } from 'react';

const AppointmentMap = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full h-52 sm:h-80 overflow-hidden rounded-md">
      {isMapLoaded ? (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.5315287151398!2d55.2356858!3d25.117714799999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f698d0b075de1%3A0x223e3563a8be56be!2sBlinds%20And%20Curtains%20Dubai!5e0!3m2!1sen!2s!4v1747742085493!5m2!1sen!2s"
          width="100%"
          height="100%"
          className="border-0 w-full h-full"
          loading="lazy"
          allowFullScreen
          title="Blinds And Curtains Dubai"
        />
      ) : (
        <div className="w-full h-full animate-pulse bg-gray-300 rounded-md" />
      )}
    </div>
  );
};

export default AppointmentMap;
