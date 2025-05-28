'use client';
import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { VideoItem } from 'types/product';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

interface ThumbnailProps {
  images?: { imageUrl: string; altText?: string; colorCode?: string }[];
  selectedColor?: string;
  setColorImage?: React.Dispatch<React.SetStateAction<string>>;
  videos: VideoItem[];
  title: string;
  videoThumbnail?: string;
}
interface SliderWithGoTo extends Slider {
  slickGoTo: (index: number, dontAnimate?: boolean) => void;
}

const Thumbnail = ({
  images = [],
  selectedColor,
  setColorImage,
  videos,
  title,
  videoThumbnail,
}: ThumbnailProps) => {
  const [nav1, setNav1] = useState<SliderWithGoTo | undefined>(undefined);
  const [nav2, setNav2] = useState<SliderWithGoTo | undefined>(undefined);
  const [activeIndex, setActiveIndex] = useState(0);

  const slider1 = useRef<SliderWithGoTo | null>(null);
  const slider2 = useRef<SliderWithGoTo | null>(null);

  const isMotorisedCategory =
    title?.toLowerCase().includes('motorised blinds') ||
    title?.toLowerCase().includes('motorised curtains');

  const displayImages =
    isMotorisedCategory && videos.length > 0 ? images.slice(1) : images;

  useEffect(() => {
    setNav1(slider1.current ?? undefined);
    setNav2(slider2.current ?? undefined);
  }, []);

  useEffect(() => {
    if (selectedColor && images?.length) {
      const matchIndex = images.findIndex(
        (img) =>
          img.colorCode &&
          `#${img.colorCode.toUpperCase()}` === selectedColor.toUpperCase()
      );
      if (matchIndex !== -1 && matchIndex !== activeIndex) {
        const index = isMotorisedCategory ? matchIndex + 1 : matchIndex;
        setActiveIndex(index);
        slider1.current?.slickGoTo(index);
        slider2.current?.slickGoTo(index);
      }
    }
  }, [selectedColor]);

  const mainSettings = {
    slidesToShow: 1,
    arrows: false,
    asNavFor: nav2,
    beforeChange: (_current: number, next: number) => {
      setActiveIndex(next);
      const index = isMotorisedCategory ? next - 1 : next;
      if (setColorImage && images && index >= 0 && images[index]?.colorCode) {
        setColorImage(`#${images[index].colorCode.toUpperCase()}`);
      }
    },
  };

  const NextArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="absolute right-0 md:-right-3 top-1/2 -translate-y-1/2 z-10 bg-secondary rounded-full shadow-md flex justify-center items-center size-6"
    >
      <MdKeyboardArrowRight className="text-white text-2xl" />
    </button>
  );

  const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      onClick={onClick}
      className="absolute left-0 md:-left-3 top-1/2 -translate-y-1/2 z-10 bg-secondary rounded-full shadow-md flex justify-center items-center size-6"
    >
      <MdKeyboardArrowLeft className="text-white text-2xl" />
    </button>
  );

  const thumbSettings = {
    slidesToShow: 4,
    asNavFor: nav1,
    arrows: displayImages.length > 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    swipeToSlide: displayImages.length > 4,
    focusOnSelect: displayImages.length > 4,
    draggable: displayImages.length > 4,
  };

  return (
    <div>
      <Slider {...mainSettings} ref={slider1} className="overflow-hidden outline-0">
        {isMotorisedCategory && videos.length > 0 && (
          <div className="relative w-full h-[340px] md:h-[450px] xl:h-[563px] bg-black flex items-center justify-center">
            <video
              className="w-full h-full object-cover"
              controls
              src={videos[0]?.imageUrl}
            />
          </div>
        )}
        {displayImages.map((img, index) => (
          <div key={index}>
            <Image
              src={img.imageUrl}
              alt={img.altText || ''}
              width={800}
              height={600}
              className="w-full h-[340px] md:h-[450px] xl:h-[563px] object-cover"
            />
          </div>
        ))}
      </Slider>

      {displayImages.length > 0 && displayImages.length > 4 ? (
        <Slider {...thumbSettings} ref={slider2}>
          {isMotorisedCategory && videos.length > 0 && (
            <div
              onClick={() => {
                setActiveIndex(0);
                slider1.current?.slickGoTo(0);
              }}
              className={`cursor-pointer border-2 
                aspect-square
                w-20 sm:w-28 lg:w-32 xl:w-40
                ${activeIndex === 0 ? 'border-secondary' : 'border-transparent'}`}
            >
              {videoThumbnail ? (
                <Image
                  src={videoThumbnail}
                  alt="Video thumbnail"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-black flex items-center justify-center text-white">
                  ▶ Video
                </div>
              )}
            </div>
          )}
          {displayImages.map((img, index) => {
            const adjustedIndex = isMotorisedCategory ? index + 1 : index;
            return (
              <div
                key={index}
                onClick={() => {
                  setActiveIndex(adjustedIndex);
                  slider1.current?.slickGoTo(adjustedIndex);
                }}
                className={`cursor-pointer border-2 
                  aspect-square
                  w-20 sm:w-28 lg:w-32 xl:w-40
                  ${
                    adjustedIndex === activeIndex
                      ? 'border-secondary'
                      : 'border-transparent'
                  }`}
              >
                <Image
                  src={img.imageUrl}
                  alt={img.altText || ''}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </Slider>
      ) : (
        <div className="flex gap-2">
          {isMotorisedCategory && videos.length > 0 && (
            <div
              onClick={() => {
                setActiveIndex(0);
                slider1.current?.slickGoTo(0);
              }}
              className={`cursor-pointer border-2 
                aspect-square
                w-20 sm:w-28 lg:w-32 xl:w-40
                ${activeIndex === 0 ? 'border-secondary' : 'border-transparent'}`}
            >
              {videoThumbnail ? (
                <Image
                  src={videoThumbnail}
                  alt="Video thumbnail"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-black flex items-center justify-center text-white">
                  ▶ Video
                </div>
              )}
            </div>
          )}
          {displayImages.map((img, index) => {
            const adjustedIndex = isMotorisedCategory ? index + 1 : index;
            return (
              <div
                key={index}
                onClick={() => {
                  setActiveIndex(adjustedIndex);
                  slider1.current?.slickGoTo(adjustedIndex);
                }}
                className={`cursor-pointer border-2 
                  aspect-square
                  w-20 sm:w-28 lg:w-32 xl:w-40
                  ${
                    adjustedIndex === activeIndex
                      ? 'border-secondary'
                      : 'border-transparent'
                  }`}
              >
                <Image
                  src={img.imageUrl}
                  alt={img.altText || ''}
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Thumbnail;
