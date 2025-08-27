"use client";
import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

interface Option {
  value: string;
  label: string;
  disabled?: boolean; // ✅ added support for disabled
}

interface SelectProps {
  name: string;
  options: Option[];
  defaultValue?: string;
  onChange: (value: string, name: string) => void;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  name,
  options,
  defaultValue,
  onChange,
  className,
}) => {
  const [selected, setSelected] = useState<string>(
    defaultValue || options[0]?.value || ""
  );
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string, disabled?: boolean) => {
    if (disabled) return; // ✅ prevent selecting disabled
    setSelected(value);
    onChange(value, name); // return both value + name
    setOpen(false);
  };

  // ✅ close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative w-full ${className || ""}`}>
      {/* Selected box */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
        className="w-full border rounded-md px-3 h-12 flex justify-between items-center text-black dark:text-white bg-white dark:bg-transparent outline-none"
      >
        <span>{options.find((opt) => opt.value === selected)?.label}</span>
        <FiChevronDown
          className={`w-4 h-4 transform transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-primary border border-gray-300 dark:border-neutral-600 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value, opt.disabled)}
              className={`px-3 py-2 text-sm cursor-pointer select-none ${
                opt.disabled
                  ? "text-gray-400 cursor-not-allowed"
                  : selected === opt.value
                  ? "bg-secondary text-white"
                  : "hover:bg-gray-100 dark:hover:bg-secondary text-black dark:text-white"
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
      <input type="hidden" name={name} value={selected} />
    </div>
  );
};

export default Select;
