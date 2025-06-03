"use client";

import React, { useEffect, useRef } from "react";
import Container from "components/Res-usable/Container/Container";
import { workingProcessData } from "data/SellerSlider";
import Image from "next/image";
import Link from "next/link";
export default function SimpleSteps() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-secondary-foreground sm:bg-transparent pb-5 sm:pb-0">
      <Container className="mt-5 md:mt-10">
        <div className="mx-auto px-1 md:px-4">
          <div className="sm:py-7 pt-5 pb-0 space-y-5">
            <h2 className="categoryHeading text-primary text-center block font-bold text-24 lg:text-[48px] font-robotoSerif">
              {workingProcessData.heading}
            </h2>
            <p className="font-normal text-[20px] mb-2 text-center font-roboto text-primary max-w-5xl mx-auto sm:block hidden">
              {workingProcessData.subheading}
            </p>
            <h3 className="sm:text-2xl text-xl sm:font-bold font-semibold text-primary mb-6 text-center font-robotoSerif block sm:hidden">
              Just <span className="text-[#F1B42F]">4</span> Simple Steps
            </h3>
          </div>

          <div className="flex md:flex-row flex-col justify-center gap-8 md:gap-3 lg:gap-8 items-center sm:bg-secondary-foreground">
            <div className="relative w-full h-full md:h-[600px] sm:w-3/5 sm:pt-5 lg:pt-0 xl:pb-10">
              <video
                src={workingProcessData.videoUrl}
                className="w-full h-full object-fill"
                autoPlay
                loop
                muted
                playsInline
                aria-describedby="video-caption"
              />
            </div>

            <div className="w-full md:sm:w-2/5 flex flex-col justify-center items-center sm:pb-5">
              <h3 className="text-[24px] font-bold text-primary mb-6 md:mb-3 xl:mt-6 font-robotoSerif sm:block hidden">
                Just <span className="text-[#F1B42F]">4</span> Simple Steps
              </h3>
              <div>
                {workingProcessData.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 mt-1">
                    <div className="flex flex-col items-center space-y-1">
                      <div className="rounded-full font-roboto bg-[#F1B42F1A] sm:p-2 sm:text-base text-12 text-[#F1B42F] border-2 border-[#F1B42F1A] font-semibold flex items-center justify-center min-w-[70px] min-h-[70px]">
                        {step.step}
                      </div>
                      <Image
                        src={step.iconimage}
                        alt="Working Process"
                        width={110}
                        height={110}
                        className={`w-auto h-8.5 ${idx === workingProcessData.steps.length - 1 ? "hidden" : ""
                          }`}
                      />
                    </div>
                    <div className="flex flex-col justify-center pt-3">
                      <h4 className="text-[18px] sm:text-[20px] md:text-[16px] lg:text-[18px] xl:text-[20px] font-bold text-primary font-robotoSerif">
                        {step.title}
                      </h4>
                      <p className="text-[16px] md:text-[14px] lg:text-[16px] xl:text-[20px] text-primary font-roboto">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/request-appointment/"
                aria-label="Book A Free Visit"
                className="bg-secondary text-primary py-3 px-8 sm:px-16 block rounded-md w-fit font-semibold mt-10 mb-2 max-sm:mx-auto"
              >
                Book A Free Visit
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}