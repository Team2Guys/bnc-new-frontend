"use client";

import Container from "components/Res-usable/Container/Container";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { InfoTabsProps, TabDataItem } from "types/product";
import { tabData as Data } from "data/Homedata/tabdata";

export default function InfoTabs({ tabData, isHome, isCurtainsCategory, isMotorisedCategory }: InfoTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeMobileTab, setActiveMobileTab] = useState<number | null>(null);
  const activeTabData = useMemo<TabDataItem[]>(() => tabData ?? Data, [tabData]);
  const desktopContent = useMemo(() => activeTabData[activeTab], [activeTab, activeTabData]);
  const mobileContent = useMemo(() => {
  if (activeMobileTab !== null) return activeTabData[activeMobileTab];
  return activeTabData[activeTab];
  }, [activeMobileTab, activeTab, activeTabData]);

  return (
    <div className={`bg-secondary-foreground ${isHome ? "" : "mt-10"}`}>
      <Container>
        <div className="text-center text-primary font-bold font-futura text-2xl lg:text-4xl py-5 sm:py-7">
          {isHome ? (
            <><span className="text-secondary">Trusted</span> by <span className="text-secondary">18,000+ </span>Happy Customers</>
          ) :(
            <span>Standout Features of Smart {isCurtainsCategory ? "Curtains" : "Blinds"}</span>
          )}
        </div>
        <div className="hidden sm:flex justify-between text-center">
          {activeTabData.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`text-black flex sm:block items-center gap-3 py-2 md:py-2 whitespace-nowrap w-full px-4 text-base sm:justify-center text-center mx-auto focus:outline-none font-semibold transition duration-300 z-20 ${
                activeTab === index
                  ? "border-b-[5px] border-secondary text-black font-bold"
                  : "border-b-[5px] border-transparent hover:border-secondary font-black"
              }`}
            >
              <Image src={tab.icon} alt="tab icon" width={200} height={200} className="w-10 h-10 lg:w-16 lg:h-16 sm:mx-auto" />
              <p className={`text-primary text-wrap lg:px-6 :px-0 ${isHome ? "text-lg xl:text-xl 2xl:px-16" : "2xl:px-10 text-base xl:text-xl"}`}>{tab.title}</p>
            </button>
          ))}
        </div>
        <hr className="relative bottom-[5px] bg-primary border-b-4 border-black hidden sm:block" />
        <div className="hidden md:block">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-16 2xl:gap-24 items-center md:py-8 p-2">
            <div className="flex flex-col justify-center items-start space-y-5 lg:space-y-12">
              <h2 className="font-futura font-bold text-lg lg:text-4xl text-primary sm:pr-10">{desktopContent.heading}</h2>
              <p className="text-base font-medium font-roboto lg:text-[20px] text-primary text-justify" dangerouslySetInnerHTML={{ __html: desktopContent.description }} suppressHydrationWarning />
              <Link href="/request-appointment/"className="border bg-secondary text-primary font-semibold text-base font-roboto px-6 py-2 md:py-4 rounded-xl hover:bg-primary-dark transition hover:opacity-65">
                Book A Free Visit
              </Link>
            </div>
            <div className={`relative w-full object-contain ${isHome ? "px-4 h-[235px] lg:h-[454px]" : "h-[500px] lg:h-[547px]"}`}>
              <Image src={desktopContent.image} alt={desktopContent.heading} fill loading="lazy" className={`${isMotorisedCategory && "object-contain"}`} />
              {isHome && (
                <div className="absolute bottom-10 -left-12 lg:bottom-32 xl:bottom-[73px] lg:-left-[80px] 2xl:-left-24 w-[116px] h-[56px] md:h-[70px] md:w-[140px] lg:h-[100px] lg:w-[200px] bg-primary flex flex-col items-center justify-center -rotate-90">
                  <span className="text-white font-semibold text-sm md:text-[22px] lg:text-2xl font-futura">20 Years</span>
                  <span className="text-white text-[8px] md:text-[10px] lg:text-sm font-medium md:mt-2 font-roboto">Making Blinds & Curtains</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <div className={`relative mb-4 w-full ${isHome ? "h-[235px]" : "h-[450px]"}`}>
            <Image src={mobileContent.image} alt={mobileContent.heading} fill className={`${isMotorisedCategory && "object-contain"}`} />
            {isHome && (
              <div className="absolute bottom-[30px] -right-[30px] w-[116px] h-[56px] bg-primary flex flex-col items-center justify-center -rotate-90">
                <span className="text-white font-semibold text-sm font-futura">20 Years</span>
                <span className="text-white text-[8px] font-medium mt-1 font-roboto">Making Blinds & Curtains</span>
              </div>
            )}
          </div>
          {activeTabData.map((tab, index) => (
            <div key={index} className="mb-4 border-b border-gray-300">
              <button onClick={() => setActiveMobileTab(activeMobileTab === index ? null : index)} className="w-full flex justify-between items-center py-3 text-left">
                <div className="flex justify-start items-center gap-2">
                  <Image src={tab.icon} alt="image" width={30} height={30} className="w-9 h-9" />
                  <span className="text-primary font-roboto font-medium md:font-normal text-base leading-[130%]">{tab.title}</span>
                </div>
                <div>
                  {activeMobileTab === index ? <BsChevronUp className="text-primary font-semibold" size={18} /> : <BsChevronDown className="text-primary font-semibold" size={18} />}
                </div>
              </button>
              {activeMobileTab === index && (
                <div className="px-4 pb-4 space-y-3">
                  <p className="text-base text-primary" dangerouslySetInnerHTML={{ __html: tab.description }} suppressHydrationWarning />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <Link href="/request-appointment/" className="sm:hidden my-3 inline-block bg-secondary text-primary font-medium text-lg sm:text-sm px-5 py-2 rounded-md shadow hover:bg-primary-dark transition" aria-label="Book a free visit">
            Book A Free Visit
          </Link>
        </div>
      </Container>
    </div>
  );
}
