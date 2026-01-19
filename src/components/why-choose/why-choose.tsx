"use client";
import React from "react";
import Image from "next/image";
import SlickSlider from "components/Blogs/slick-slider";
import { WhyChooseProps } from "types/types";

const WhyChoose = ({reverse = false, title, description, sliderImages,}:WhyChooseProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 items-center">
      <div className={`${reverse ? "md:order-2" : "md:order-1"} space-y-4`}>
        <h2 className="text-2xl md:text-5xl md:!leading-[1.1] font-semibold font-futura text-primary">{title}</h2>
        <div className="space-y-3 font-roboto text-primary"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <div className={`${reverse ? "md:order-1" : "md:order-2"}`}>
        <SlickSlider 
        settings={{
          slidesToShow: 1,
          responsive: [
            {
              breakpoint: 1024,
              settings: { slidesToShow: 1 },
            },
          ],}}
          padding='px-0'
          margin='mt-4'
          >
          {sliderImages.map((img, index) => (
          <div className="relative h-72 xss:h-96 md:h-[520px]" key={index}>
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 640px) 100vw, 
                  (max-width: 768px) 100vw, 
                  50vw"
            className="rounded-lg object-cover"
          />
        </div>
          ))}
        </SlickSlider>
      </div>
    </div>
  );
};

export default WhyChoose;
