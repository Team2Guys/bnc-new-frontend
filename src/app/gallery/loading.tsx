'use client';
import ImageCardLoading from 'components/Skeleton/image-card-loading';
import React from 'react';

const Loading = () => {
  return (
    <ImageCardLoading itemsPerPage={9} className="xs:mt-20 mt-5 md:px-4" />
  );
};

export default Loading;
