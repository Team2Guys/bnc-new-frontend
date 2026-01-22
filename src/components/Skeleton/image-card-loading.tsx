import Container from 'components/Res-usable/Container/Container';
import React from 'react';

interface SkeletonGridProps {
  itemsPerPage: number;
  columns?: number;
  className?: string;
}

const ImageCardLoading: React.FC<SkeletonGridProps> = ({
  itemsPerPage,
  columns = 4,
  className = '',
}) => {
  return (
    <>
      <div className={`bg-gray-300 h-96 mt-10 w-full rounded-lg`}></div>
      <Container>
        <div
          className={`bg-gray-300 h-14 mt-10 w-[300px] mx-auto rounded-lg`}
        ></div>
        <div
          className={`bg-gray-300 h-28 mt-14 w-full md:w-3/4 mx-auto rounded-lg`}
        ></div>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns} gap-6 ${className}`}
        >
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <div
              key={index}
              className="relative rounded-lg  group space-y-2 animate-pulse"
            >
              <div className="bg-gray-300 h-64 md:h-72 w-full rounded-xl"></div>
              <div className="bg-gray-300 h-6 w-3/4 mx-auto rounded"></div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default ImageCardLoading;
