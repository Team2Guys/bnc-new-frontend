"use client";

import { milestoneStepsData } from "data/data";
import Image from "next/image";

export default function MilestoneSteps() {
    return (
        <div className="sm:mt-20 mt-10">
            <div className="flex sm:flex-row flex-col items-center sm:gap-8">
                <h2
                    className="text-4xl sm:text-8xl text-center font-bold text-primary font-futura sm:hidden block sm:mb-0 mb-8"
                    dangerouslySetInnerHTML={{ __html: milestoneStepsData.heading }}
                />

                <div className="relative w-full sm:w-1/2 h-[300px] sm:h-[650px]">
                    <Image
                        src={milestoneStepsData.image}
                        alt="Milestone Image"
                        fill
                        className="object-cover "
                    />
                </div>

                <div className="w-full sm:w-1/2">
                    <div className="sm:text-start text-center sm:mb-10">
                        <h2
                            className="text-2xl sm:text-5xl  font-bold text-primary font-futura sm:block hidden ">{milestoneStepsData.heading} </h2>

                        <p className="text-24 sm:text-xl mt-4 text-primary font-roboto  mx-auto font-semibold">
                            {milestoneStepsData.subheading}
                        </p>
                    </div>
                    {milestoneStepsData.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-4 mt-1">
                            <div className="flex flex-col items-center space-y-1">
                                <div className="rounded-full font-roboto bg-[#F1B42F1A] sm:p-2 sm:text-base text-sm text-[#F1B42F] border-2 border-[#F1B42F1A] font-semibold flex items-center justify-center min-w-[70px] min-h-[70px]">
                                    {step.step}
                                </div>
                                {step.iconimage && idx !== milestoneStepsData.steps.length - 1 && (
                                    <Image
                                        src={step.iconimage}
                                        alt="Arrow"
                                        width={20}
                                        height={40}
                                        className="w-auto h-6"
                                    />
                                )}
                            </div>
                            {/* Description */}
                            <div className="flex flex-col justify-center pt-6">
                                <p className="text-base font-medium sm:text-lg text-primary font-futura">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
