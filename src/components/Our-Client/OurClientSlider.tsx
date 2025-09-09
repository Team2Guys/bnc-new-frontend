'use client';
import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ClientLogoGridSlider = ({ OurClientImage }: { OurClientImage: any[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    customPaging: () => (
      <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
    ),
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul className="flex justify-center !bg-white mt-4">{dots}</ul>
      </div>
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <div className="relative mb-10">
      <Slider {...settings}>
        {OurClientImage.map((image, index) => (
          <div key={index} className="px-2">
            <div className="bg-primary h-16 p-5 flex justify-center items-center">
              <Image
                className="object-contain !relative"
                src={image.src}
                alt={image.alt}
                fill
                priority
              />
            </div>
          </div>
        ))}
      </Slider>
      <style jsx global>{`
        .slick-dots li.slick-active div {
          background-color: #F1B42F !important;
        }
      `}</style>
    </div>
  );
};

export default ClientLogoGridSlider;
