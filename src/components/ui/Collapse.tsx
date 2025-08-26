"use client";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface CollapseItem {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
}

interface CollapseProps {
  items: CollapseItem[];
  defaultActiveKey?: string;
  className?: string;
}

const Collapse = ({ items, defaultActiveKey, className }: CollapseProps) => {
  const [activeKey, setActiveKey] = useState<string | null>(defaultActiveKey || null);

  const toggle = (key: string) => {
    setActiveKey(activeKey === key ? null : key);
  };

  return (
    <div className={`flex flex-col gap-1 ${className || ""}`}>
      {items.map((item) => {
        const isActive = activeKey === item.key;

        return (
          <div
            key={item.key}
            className="border-b border-gray-200 last:border-none"
          >
            <button
              className="w-full flex justify-between items-center py-2 focus:outline-none"
              onClick={() => toggle(item.key)}
            >
              <span className="sm:font-semibold font-medium text-18 text-primary font-robotoSerif">
                {item.label}
              </span>
              <IoIosArrowDown
                size={22}
                className={`text-primary opacity-60 transform transition-transform duration-300 ${
                  isActive ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 px-4 ${
                isActive ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="my-4">{item.children}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Collapse;
