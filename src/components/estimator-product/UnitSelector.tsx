'use client';
import Checkbox from 'components/ui/Checkbox';
import React from 'react';

const units = ['mm', 'cm', 'inches'];

interface UnitSelectorProps {
  selectedUnit: string;
  setSelectedUnit: (unit: string) => void;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({
  selectedUnit,
  setSelectedUnit,
}) => {
  const handleUnitChange = (unit: string) => {
    setSelectedUnit(unit);
  };

  return (
    <div className="flex gap-2 lg:gap-6 justify-between sm:justify-start estimator-radio">
      {units.map((unit, index) => (
        <Checkbox
          key={index}
          id={`unit-${unit}`}
          name="unit"
          label={unit}
          checked={selectedUnit === unit}
          onChange={() => handleUnitChange(unit)}
          radio
          className="text-xs xsm:text-sm border border-gray-200 rounded-lg flex items-center w-40 h-10 xl:h-14 px-4"
        />
      ))}
    </div>
  );
};

export default UnitSelector;
