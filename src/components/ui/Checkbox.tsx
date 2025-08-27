"use client";
import React from "react";
import { CheckboxProps } from "types/types";
const Checkbox= ({
  id,
  name,
  checked,
  label,
  radio = false,
  onChange,
  className = "",
}:CheckboxProps) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center space-x-2 cursor-pointer select-none ${className}`}
    >
      <input
        type={radio ? "radio" : "checkbox"}
        id={id}
        name={name}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />

      {!radio ? (
        <div
          className={`w-5 h-5 flex items-center justify-center border-2 rounded-md transition-colors duration-200
            ${
              checked
                ? "bg-secondary border-secondary"
                : "border-gray-400 dark:border-neutral-600"
            }`}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      ) : (
        <div
          className={`w-5 h-5 flex items-center justify-center border-2 rounded-full transition-colors duration-200
            ${
              checked
                ? "border-secondary"
                : "border-gray-400 dark:border-neutral-600"
            }`}
        >
          {checked && <div className="w-3 h-3 rounded-full bg-secondary"></div>}
        </div>
      )}
      <span className="text-black dark:text-white">{label}</span>
    </label>
  );
};

export default Checkbox;
