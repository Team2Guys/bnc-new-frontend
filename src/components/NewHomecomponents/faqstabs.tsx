"use client"
import React, { useState } from "react";
import { HiMinusSmall } from "react-icons/hi2";
import { FiPlus } from "react-icons/fi";
import { TABS } from "data/Homedata/tabdata";
import { FAQ_DATA } from "data/Homedata/faqs";

const FaqTabs = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Combine all FAQs when activeTab is "All"
  const faqsToDisplay =
    activeTab === "All"
      ? Object.values(FAQ_DATA).flat()
      : FAQ_DATA[activeTab] || [];

  return (
    <div className="">
      <div className="relative mb-3 overflow-x-auto scrollbar-hide font-roboto w-full">
        <div className="flex flex-nowrap justify-between w-max 2xl:w-full relative border-b-4 border-primary">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setOpenIndex(0);
              }}
              className={`relative group flex sm:block items-center gap-3 md:py-2 
              whitespace-nowrap px-4 sm:justify-center text-center focus:outline-none 
              transition duration-300 text-primary`}
            >
              <span
                className={`transition-all duration-200 text-base md:text-xl font-roboto text-primary capitalize ${
                  activeTab === tab ? "font-bold" : "font-normal"
                }`}
                dangerouslySetInnerHTML={{ __html: tab }}
              />
              <span
                className={`absolute bottom-[-4px] left-0 w-full h-[4px] z-10 transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-secondary"
                    : "bg-transparent group-hover:bg-secondary"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <h2
        className="text-2xl font-bold lg:text-4xl text-center my-5 sm:my-10 text-primary lg:leading-10 2xl:leading-normal font-futura "
        dangerouslySetInnerHTML={{ __html: activeTab }}
      />

      <div className="space-y-4">
        {faqsToDisplay.map((faq, index) => (
          <div
            key={index}
            className="overflow-hidden border border-primary rounded-xl"
          >
            <button
              onClick={() => toggleFaq(index)}
              className={`w-full flex justify-between items-center px-4 py-3 text-left rounded-b-md transition-all duration-200 text-sm sm:text-xl font-roboto font-bold ${
                openIndex === index
                  ? "text-white bg-primary hover:bg-primary/90"
                  : "text-primary bg-secondary-foreground hover:bg-gray-50"
              }`}
            >
              <p className="w-[90%] sm:w-full">{faq.question}</p>
              {openIndex === index ? (
                <HiMinusSmall />
              ) : (
                <FiPlus className="h-4 w-4" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-4 py-4 text-primary bg-white text-sm font-normal font-roboto sm:text-xl">
                <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqTabs;
