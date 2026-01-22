import Container from 'components/Res-usable/Container/Container';
import React from 'react';

const SimpleStepsSkeleton = () => {
  return (
    <Container className="mt-5 md:mt-10 animate-pulse">
      <div className="mx-auto px-1 md:px-4">
        <div className="sm:py-7 pt-5 pb-0 space-y-5 text-center">
          <div className="h-8 sm:h-12 w-2/3 mx-auto bg-gray-300 rounded-md" />
          <div className="hidden sm:block h-4 w-1/2 mx-auto bg-gray-200 rounded-md" />
          <div className="sm:hidden h-6 w-1/3 mx-auto bg-gray-200 rounded-md" />
        </div>
        <div className="flex md:flex-row flex-col justify-center gap-8 md:gap-3 lg:gap-8 items-center sm:bg-secondary-foreground">
          <div className="relative w-full h-[230px] md:h-[600px] sm:w-3/5 bg-gray-300 rounded-lg" />
          <div className="w-full md:sm:w-2/5 flex flex-col justify-center items-center sm:pb-5 space-y-6">
            <div className="hidden sm:block h-6 w-1/2 bg-gray-300 rounded-md" />

            <div className="space-y-5 w-full max-w-md">
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="rounded-full bg-gray-300 w-[70px] h-[70px]" />
                  <div className="flex flex-col space-y-2 flex-1">
                    <div className="h-4 w-3/4 bg-gray-300 rounded-md" />
                    <div className="h-3 w-full bg-gray-200 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
            <div className="h-10 w-1/2 bg-gray-300 rounded-md mt-6" />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SimpleStepsSkeleton;
