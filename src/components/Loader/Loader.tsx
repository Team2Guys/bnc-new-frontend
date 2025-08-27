"use client";

import React from "react";
import { FiLoader } from "react-icons/fi";

interface LoaderProps {
  size?: number;
  color?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 24, color = "#000" }) => {
  return (
    <div className="flex items-center justify-center">
      <FiLoader
        size={size}
        color={color}
        className="animate-spin"
      />
    </div>
  );
};

export default Loader;
