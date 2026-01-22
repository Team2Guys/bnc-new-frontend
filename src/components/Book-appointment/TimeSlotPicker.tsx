import React from 'react';

type TimeSlot = {
  label: string;
  value: string;
};

const preferTimeOptions: TimeSlot[] = [
  { label: '09:00 - 12:00 PM', value: '09:00 - 12:00 PM' },
  { label: '12:00 - 03:00 PM', value: '12:00 - 03:00 PM' },
  { label: '03:00 - 06:00 PM', value: '03:00 - 06:00 PM' },
];

type TimePickerProps = {
  value: string;
  onChange: (value: string) => void;
};

const TimeSlotPicker: React.FC<TimePickerProps> = ({ value, onChange }) => {
  return (
    <div className="w-full custom-datepicker">
      <div className="flex gap-2 sm:gap-4">
        {preferTimeOptions.map((option) => {
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`px-2 sm:px-4 py-2 font-medium border-2 rounded-md transition text-sm sm:text-base
                ${
                  isSelected
                    ? 'bg-secondary text-white border-secondary'
                    : 'bg-white text-gray-800 border-gray-300 hover:bg-secondary hover:border-secondary hover:text-white'
                }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotPicker;
