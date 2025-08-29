"use client";
import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  label?: string;
  name: string;
  placeholder?: string;
  type?: "text" | "password" | "number"; // only for input
  textarea?: boolean; // if true → render textarea
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  placeholder,
  type = "text",
  textarea = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      {label && <label className="primary-label">{label}</label>}

      <div className="relative">
        {/* If textarea */}
        {textarea ? (
          <Field
            as="textarea"
            name={name}
            placeholder={placeholder}
            className="primary-input h-28 resize-none"
          />
        ) : (
          <>
            <Field
              type={type === "password" ? (showPassword ? "text" : "password") : type}
              name={name}
              placeholder={placeholder}
              className="primary-input"
            />
            {type === "password" && (
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            )}
          </>
        )}
      </div>

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default Input;
