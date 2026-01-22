'use client';
import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { CustomSelectProps, Option } from 'types/ui';

const CustomSelect = ({
  options,
  value,
  onChange,
  instanceId,
  className = '',
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (option: Option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={selectRef} id={instanceId}>
      <div
        className="w-full p-3 h-14 px-4 border-2 border-gray-300 rounded-xl bg-white cursor-pointer focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(!isOpen);
            e.preventDefault();
          }
        }}
      >
        <div className="flex justify-between items-center">
          <span
            className={`text-lg ${selectedOption ? ' text-black' : 'text-gray-400'}`}
          >
            {selectedOption ? selectedOption.label : 'Select...'}
          </span>
          <span
            className={`transform transition-transform text-gray-500 border-l-2 border-gray-300 py-2 px-1`}
          >
            <IoIosArrowDown />
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="max-h-60 overflow-y-auto">
            {options.length > 0 ? (
              options.map((option) => (
                <div
                  key={option.value}
                  className={`p-3 cursor-pointer hover:bg-secondary hover:text-white transition-colors ${
                    option.value === value
                      ? 'bg-secondary text-white font-medium'
                      : ''
                  }`}
                  onClick={() => handleSelect(option)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleSelect(option);
                      e.preventDefault();
                    }
                  }}
                  tabIndex={0}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="p-3 text-primary text-center">
                No options found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
