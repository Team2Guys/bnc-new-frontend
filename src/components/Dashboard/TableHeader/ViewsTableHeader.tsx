'use client';
import React from 'react';

interface CategoryHeaderProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  canAdd: boolean;
  setEdit?: (value: any) => void;
  setMenuType: (value: string) => void;
  menuTypeText: string;
}

const ViewsTableHeader: React.FC<CategoryHeaderProps> = ({
  searchTerm,
  onSearchChange,
  canAdd,
  setEdit,
  setMenuType,
  menuTypeText,
}) => {
  return (
    <div className="flex justify-between mb-4 items-center text-dark dark:text-white">
      {/* Search Input */}
      <input
        className="search_input"
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={onSearchChange}
      />

      {/* Add Category Button */}
      <div>
        <p
          className={`${canAdd ? 'cursor-pointer bg-secondary text-white rounded-md hover:text-white' : 'cursor-not-allowed'} lg:p-2 md:p-2 flex justify-center`}
          onClick={() => {
            setEdit?.(null);
            if (canAdd) {
              setMenuType(menuTypeText);
            }
          }}
        >
          {menuTypeText}
        </p>
      </div>
    </div>
  );
};

export default ViewsTableHeader;
