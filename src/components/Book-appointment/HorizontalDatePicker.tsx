import React, { useState } from 'react';
import { format, addDays, isSameDay } from 'date-fns';

type HorizontalDatePickerProps = {
  onChange: (date: Date) => void;
};

const HorizontalDatePicker: React.FC<HorizontalDatePickerProps> = ({
  onChange,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const days: Date[] = Array.from({ length: 45 }, (_, i) =>
    addDays(new Date(), i),
  );
  console.log(days, 'days');
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onChange(date);
  };

  return (
    <div className="w-full">
      <div className="flex overflow-x-auto space-x-3 sm:space-x-4 justify-between pb-2">
        {days.map((date, index) => {
          const isSelected = isSameDay(date, selectedDate);

          return (
            <div key={index} className="flex flex-col items-center sm:gap-2">
              <span className="text-base sm:text-xl font-semibold">
                {format(date, 'eee')}
              </span>
              <button
                type="button"
                onClick={() => handleDateClick(date)}
                className={`flex justify-center items-center size-9 sm:size-14 rounded-full border-2 transition font-semibold text-base sm:text-xl
                ${
                  isSelected
                    ? 'bg-secondary text-white border-secondary'
                    : 'border-gray-300 text-gray-700 hover:bg-secondary hover:border-secondary hover:text-white text-primary'
                }`}
              >
                {format(date, 'dd')}
              </button>
              <span className="text-base sm:text-xl font-semibold hidden sm:block">
                {format(date, 'MMM')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalDatePicker;
