"use client";

import { whyChooseData } from "data/data";
import Image from "next/image";
import { WhyChooseItem } from "types/types";

const WhyChoose = () => {
    return (
      <>
        <section className="sm:py-16 mt-10 bg-white text-center">
            <h2 className="sm:text-4xl text-[27px] font-bold mb-2 font-robotoSerif text-primary">Why Choose Two Guys?</h2>
            <p className="text-[#3E3F42] text-base sm:mb-12 font-roboto font-normal">
                You just found the industrys premier window treatment design team.
            </p>

            <div className="relative flex flex-col sm:gap-10 gap-43 lg:flex-row lg:justify-between lg:items-start lg:gap-0">
                {whyChooseData.map((item: WhyChooseItem, index: number) => (
                    <div
                        key={index}
                        className="relative flex flex-col items-center text-center lg:w-1/4"
                    >
                        {index < whyChooseData.length - 1 && (
                            <div className="hidden lg:block absolute top-12 right-[-50%] w-full h-[50px] border-10 border-t border-dashed border-gray-700 z-0"></div>
                        )}

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="flex items-center justify-center sm:mb-4">
                                <Image
                                    src={item.icon}
                                    alt={item.title}
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <h3 className="font-extrabold font-robotoSerif text-20 mb-2 text-primary"  dangerouslySetInnerHTML={{ __html: item.title }} />
                            <p className="text-base font-roboto text-[#3E3F42]">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
        
        </>
    );
};

export default WhyChoose;
