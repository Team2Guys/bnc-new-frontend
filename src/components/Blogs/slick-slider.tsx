'use client';
import React, { Children, useState } from 'react';
import Slider from 'react-slick';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 -right-2 transform -translate-y-1/2 z-10 cursor-pointer justify-around"
      onClick={onClick}
    >
      <GrFormNext className="text-3xl xl:text-4xl text-white transition border-2 border-white rounded-full bg-transparent backdrop-blur-sm" />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 -left-2 transform -translate-y-1/2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <GrFormPrevious className="text-3xl xl:text-4xl text-white transition border-2 border-white rounded-full bg-transparent backdrop-blur-sm" />
    </div>
  );
};

interface BlogSliderProps {
  children: React.ReactNode;
  className?: string;
  settings?: any;
  title?: string;
  padding?: string;
  margin?: string;
}

const SlickSlider: React.FC<BlogSliderProps> = ({
  children,
  className,
  settings,
  title,
  padding,
  margin,
}) => {
  const [dragging, setDragging] = useState(false);

  const defaultSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    swipeToSlide: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: () => setDragging(true),
    afterChange: () => setDragging(false),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 540,
        settings: { slidesToShow: 1 },
      },
    ],
    ...settings,
  };
  const wrappedChildren = Children.map(children, (child: any) => {
    return (
      <div
        className={`${padding ? padding : 'px-4'}`}
        onClick={(e) => {
          if (dragging) {
            e.preventDefault();
          }
        }}
      >
        {child}
      </div>
    );
  });

  return (
    <div className={`${margin ? margin : 'mt-10'}`}>
      {title && (
        <h3 className=" text-3xl md:text-5xl font-extrabold font-futura text-primary border-b-2 py-3">
          {title}
        </h3>
      )}
      <div
        className={`relative ${margin ? margin : 'mt-10'} ${className || ''}`}
      >
        <Slider {...defaultSettings}>{wrappedChildren}</Slider>
      </div>
    </div>
  );
};

export default SlickSlider;
