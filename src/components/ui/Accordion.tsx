import React, { useState } from 'react';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { AccordionProps } from 'types/product';

const Accordion = ({ items }:AccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className=" px-2 sm:p-4 space-y-2 ">
      {items && items.map((item, index) => (
        <div key={index} className="border-b rounded-md bg-white py-2 space-y-2">
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between text-left pt-2 font-semibold font-robotoSerif text-base md:text-xl text-primary"
          >
            {item.specsHeading}
            <span className="text-xl">{openIndex === index ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown /> }</span>
          </button>
          {openIndex === index && (
            <div className=" text-primary font-medium text-sm md:text-base" dangerouslySetInnerHTML={{ __html: item.specsDetails ?? '' }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
