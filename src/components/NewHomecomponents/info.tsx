"use client";
import Container from "components/Res-usable/Container/Container";
import { useState } from "react";
import Image from "next/image";

import Link from "next/link";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { InfoTabsProps } from "types/product";

export default function InfoTabs({ tabData,isHome , isCurtainsCategory, isMotorisedCategory }: InfoTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeMobileTab, setActiveMobileTab] = useState<number | null>(null);

  return (
    <div className={`bg-secondary-foreground ${isHome?"":"mt-10"}`}>
    <Container>
      {
        isHome ? 
              <div className="text-center text-primary font-bold font-robotoSerif text-24 lg:text-[40px] py-5 sm:py-7">
        <span className="text-secondary">Trusted</span> by <span className="text-secondary">18,000+ </span>Happy Customers
      </div>
        :
        <div className="text-center text-primary font-bold font-robotoSerif text-24 lg:text-[40px] py-5 sm:py-7">
            <span>Standout Features of Smart {isCurtainsCategory ? 'Curtains' : 'Blinds'}</span>
          </div>
      }


      {/* Desktop Tabs */}
      <div className="hidden sm:flex justify-between text-center">
        {tabData.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`
              text-black flex sm:block items-center gap-3 py-2 md:py-2 
              whitespace-nowrap w-full px-4 text-17 sm:justify-center text-center mx-auto
              focus:outline-none font-semibold transition duration-300 z-20
               ${
              activeTab === index
                ? "border-b-[5px] border-secondary text-black font-bold"
                : "border-b-[5px] border-transparent hover:border-secondary font-black"
            }`}>
            <Image
              src={tab.icon}
              alt='tab icon'
              width={200}
              height={200}
              className="w-10 h-10 lg:w-16 lg:h-16 sm:mx-auto"
            />
            <p className={` text-primary text-wrap  lg:px-6 :px-0 ${isHome ? "text-[18px] xl:text-[24px] 2xl:px-16": "2xl:px-10 text-[16px] xl:text-[20px]"}`}>{tab.title}</p>
          </button>
        ))}
      </div>
      <hr className=" relative bottom-[5px] bg-primary border-b-4 border-black hidden sm:block" />
      {/* Desktop Content */}
      <div className="hidden sm:block">
        <div className="grid md:grid-cols-2 gap-6 lg:gap-16 2xl:gap-24 items-center md:py-8 p-2">
          <div className="flex flex-col justify-center items-start space-y-5 lg:space-y-12">
            <h1 className="font-robotoSerif font-semibold text-20 lg:text-[40px] text-primary sm:pr-10">{tabData[activeTab].heading}</h1>
            <p className="text-[16px] font-normal font-roboto lg:text-[20px] text-primary text-justify" dangerouslySetInnerHTML={{__html:tabData[activeTab].description}}/>
            <Link href={tabData[activeTab].href} className=" border bg-secondary text-primary font-semibold text-16 font-roboto px-6 py-2 md:py-4 rounded-xl hover:bg-primary-dark transition hover:opacity-65">
              {tabData[activeTab].buttonText}
            </Link>
          </div>
          <div className={`relative w-full object-contain ${isHome ? "px-4  h-[235px] lg:h-[454px]":"h-[500px] lg:h-[547px] "}`}> 
            <Image
              src={tabData[activeTab].image}
              alt={tabData[activeTab].heading}
              fill
              loading="lazy"
              className={`${isMotorisedCategory && 'object-contain'}`}
            />
            {
              isHome &&
            <div className="absolute bottom-10 -left-10 lg:bottom-32 xl:bottom-[73px] lg:-left-[80px] 2xl:-left-24 w-[116px] h-[56px] md:h-[70px] md:w-[140px] lg:h-[100px] lg:w-[200px] bg-primary flex flex-col items-center justify-center -rotate-90">
              <span className="text-white font-semibold text-14 md:text-22 lg:text-[24px] font-robotoSerif">20 Years</span>
              <span className="text-white text-[8px] md:text-10 lg:text-[14px] font-medium md:mt-2 font-roboto">Making Blinds & Curtains</span>
            </div>
            }
          </div>
        </div>
      </div>

    {/* Mobile View */}
    <div className="sm:hidden">
    <div className={`relative mb-4 w-full ${isHome? "h-[235px] object-cover" : "h-[450px] object-contain"}`}>
    <Image
      src={tabData[activeMobileTab ?? 0].mobileImage || tabData[activeMobileTab ?? 0].image}
      alt={tabData[activeMobileTab ?? 0].heading}
      fill
      className="w-full"
    />
    {
      isHome &&
      <div className="absolute bottom-[30px] -right-[30px] w-[116px] h-[56px] bg-primary flex flex-col items-center justify-center -rotate-90">
      <span className="text-white font-semibold text-14 font-robotoSerif">20 Years</span>
      <span className="text-white text-[8px] font-medium mt-1 font-roboto">Making Blinds & Curtains</span>
    </div>
    }
   </div>

  {/* Accordion Tabs */}
  {tabData.map((tab, index) => (
    <div key={index} className="mb-4 border-b border-gray-300">
      <button
        onClick={() =>
          setActiveMobileTab(activeMobileTab === index ? null : index)
        }
        className="w-full flex justify-between items-center py-3 text-left"
      >
        <div className="flex justify-start items-center gap-2">
          <Image src={tab.icon} alt="image" width={30} height={30} className="w-9 h-9" />
          <span className="text-primary font-roboto font-medium  md:font-normal text-[16px] leading-[130%]">{tab.title}</span>
        </div>
        <div>
          {activeMobileTab === index ? <BsChevronUp className="text-primary font-semibold" size={18} /> : <BsChevronDown className="text-primary font-semibold" size={18} />}
        </div>
      </button>

      {activeMobileTab === index && (
        <div className="px-4 pb-4 space-y-3">
          <p className="text-[16px] text-primary" dangerouslySetInnerHTML={{__html:tab.description}}/>
        </div>
      )}
    </div>
  ))}
  </div>
      <div className="flex justify-center items-center">
          <Link
            href="/request-appointment/"
            className="sm:hidden my-3 inline-block bg-secondary text-primary font-medium  text-lg sm:text-[14px] px-5 py-2 rounded-md shadow hover:bg-primary-dark transition"
            aria-label="Book a free visit"
          >
            Book A Free Visit
          </Link>
        </div>
    </Container>
    </div>
  );
}
