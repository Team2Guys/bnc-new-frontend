import React from 'react';

export const ReviewBackground = ({ className }: { className?: string }) => {
  return (
    <svg
      width="500"
      height="100"
      viewBox="0 0 375 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0H375L358.464 29.4719L375 61H0L14.5833 30.8427L0 0Z"
        fill="#3E3F42"
        className={`sm:w-full ${className}`}
      />
    </svg>
  );
};

export const ReviewBackgrounddashktop = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <svg
      viewBox="0 0 1440 60"
      className={`w-full h-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path d="M0 0H1440L1376.5 30L1440 60H0L56 30L0 0Z" fill="#3E3F42" />
    </svg>
  );
};
