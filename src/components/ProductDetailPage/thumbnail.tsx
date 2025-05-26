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
  videoThumbnail?: string; // Add this prop for video thumbnail image
}

const Thumbnail = ({ 
  images = [], 
  selectedColor, 
  setColorImage, 
  videos, 
  title, 
  videoThumbnail 
}: ThumbnailProps) => {
  const [nav1, setNav1] = useState<Slider | undefined>(undefined);
  const [nav2, setNav2] = useState<Slider | undefined>(undefined);
  const [activeIndex, setActiveIndex] = useState(0);
  const slider1 = useRef<Slider | null>(null);
  const slider2 = useRef<Slider | null>(null);

  const isMotorisedCategory =
    title?.toLowerCase().includes('motorised blinds') || title?.toLowerCase().includes('motorised curtains');
// Filter out the first image if it's a motorised category with videos
  const displayImages = isMotorisedCategory && videos.length > 0 ? images.slice(1) : images;
  
  useEffect(() => {
    setNav1(slider1.current ?? undefined);
    setNav2(slider2.current ?? undefined);
  }, []);

  useEffect(() => {
    if (selectedColor && images?.length) {
      const matchIndex = images.findIndex(
        (img) => img.colorCode && `#${img.colorCode.toUpperCase()}` === selectedColor.toUpperCase()
      );
      if (matchIndex !== -1 && matchIndex !== activeIndex) {
        setActiveIndex(isMotorisedCategory ? matchIndex + 1 : matchIndex); // +1 because video is first
        (slider1.current as any)?.slickGoTo(isMotorisedCategory ? matchIndex + 1 : matchIndex);
        (slider2.current as any)?.slickGoTo(isMotorisedCategory ? matchIndex + 1 : matchIndex);
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
           <MdKeyboardArrowRight className='text-white text-2xl' />
         </button>
    );
  
    const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
       <button
          onClick={onClick}
          className="absolute left-0 md:-left-3 top-1/2 -translate-y-1/2 z-10 bg-secondary rounded-full shadow-md flex justify-center items-center size-6"
        >
          <MdKeyboardArrowLeft className='text-white text-2xl' />
        </button>
        
    );
  
  const thumbSettings = {
    slidesToShow: 4,
    asNavFor: nav1,
    arrows: displayImages.length > 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    swipeToSlide: true,
    focusOnSelect: true,
  };



  return (
    <div>
      {/* Main Slider */}
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

      {/* Thumbnail Slider */}
      <Slider {...thumbSettings} ref={slider2}>
        {isMotorisedCategory && videos.length > 0 && (
          <div
            className={`focus:outline-none border-2 w-full ${
              activeIndex === 0 ? 'border-secondary' : 'border-transparent'
            }`}
          >
            {videoThumbnail ? (
              <Image
                src={videoThumbnail}
                width={200}
                height={200}
                className="w-full h-20 sm:h-28 lg:h-32 xl:h-40 object-cover"
                loading='eager'
                alt="Video thumbnail"
              />
            ) : (
              <div className="w-full h-20 sm:h-28 lg:h-32 xl:h-40 bg-black flex items-center justify-center text-white">
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
              className={`focus:outline-none border-2 w-full ${
                adjustedIndex === activeIndex ? 'border-secondary' : 'border-transparent'
              }`}
            >
              <Image
                src={img.imageUrl}
                width={200}
                height={200}
                className="w-full h-20 sm:h-28 lg:h-32 xl:h-40 object-cover"
                loading='eager'
                alt={img.altText || ''}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Thumbnail;