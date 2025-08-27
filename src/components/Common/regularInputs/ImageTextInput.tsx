// components/TextInput.tsx
"use client";
import React from "react";

interface TextInputProps {
  name: string;
  value: string;
  placeholder?: string;
  className?: string;
  type?: string;
  onChange: (value: string) => void;
}

const ImageTextInput: React.FC<TextInputProps> = ({
  name,
  value,
  placeholder = "",
  className = "primary-input",
  type = "text",
  onChange,
}) => {
  return (
    <input
      name={name}
      value={value}
      placeholder={placeholder}
      className={className}
      type={type}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default ImageTextInput;
