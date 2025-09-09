'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IREVIEWS } from 'types/general';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { getRandomColor } from 'utils/helperFunctions';

const ReviewImages = ({ testimonial }: { testimonial: IREVIEWS }) => {
  const [visibleCount, setVisibleCount] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width > 900) setVisibleCount(5);
      else if (width > 350) setVisibleCount(4);
      else setVisibleCount(3);
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const visibleImages = testimonial.ReviewsImages.slice(0, visibleCount);
  const remainingCount = testimonial.ReviewsImages.length - visibleCount;

  const handleImageClick = (index: number) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const sliderSettings = {
    initialSlide: activeIndex,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    adaptiveHeight: true,
  };

  return (
    <>
      <div className="flex justify-between gap-2 mt-2">
        {visibleImages.map((item, index) => {
          const isLastVisible = index === visibleImages.length - 1;
          return (
            <div
              key={index}
              className="relative size-16 cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={item.imageUrl}
                alt="review image"
                fill
                className="!relative rounded-md object-cover"
              />
              {isLastVisible && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-md text-white text-sm font-medium">
                  +{remainingCount}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <button
            className="absolute top-2 right-2 lg:right-[34%] xl:right-2 z-50 text-white bg-black/50 lg:bg-transparent text-4xl rounded-full size-10 flex justify-center items-center"
            onClick={() => setIsModalOpen(false)}
          >
            <RxCross2 />
          </button>
          <div className="relative w-full xl:max-w-[60vw] h-screen xl:h-[75vh] flex flex-col md:flex-row rounded-md overflow-hidden">
            <div className="w-full md:w-2/3 xl:w-3/4 h-full bg-black relative">
              <Slider {...sliderSettings}>
                {testimonial.ReviewsImages.map((item, index) => (
                  <div key={index} className="relative w-full h-full flex justify-center items-center">
                    <Image
                      src={item.imageUrl}
                      alt={`Slide ${index + 1}`}
                      width={1000}
                      height={600}
                      className="object-contain max-h-[75vh] mx-auto"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            <div className="w-full md:w-1/3 xl:w-1/4 h-[40vh] md:h-full bg-white drop-shadow-xl p-4 flex flex-col gap-4">
              <div className="flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  {testimonial?.posterImageUrl?.imageUrl ? (
                    <div className="w-[34px] h-[34px] relative sm:p-5 lg:p-10">
                      <Image
                        src={testimonial?.posterImageUrl.imageUrl}
                        alt="testimonial-image"
                        fill
                        className="rounded-full"
                      />
                    </div>
                  ) : (
                    <p
                      className="border sm:p-5 lg:p-10 rounded-full flex items-center justify-center text-white lg:text-[28px]"
                      style={{
                        backgroundColor: getRandomColor(),
                        color: 'white',
                        width: '34px',
                        height: '34px',
                      }}
                    >
                      {testimonial?.name?.charAt(0)?.toUpperCase()}
                    </p>
                  )}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-12 xs:text-14 2xl:text-lg font-bold">
                      {testimonial.name}
                    </h3>
                    <p className="text-12 text-[#8a8a8a]">
                      {(testimonial.reviewDate || testimonial.createdAt) &&
                        new Date(
                          testimonial.reviewDate || testimonial.createdAt
                        ).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                    </p>
                  </div>
                </div>
                <FcGoogle className="text-2xl" />
              </div>
              <div className="flex text-[#FCD503]">
                {[...Array(testimonial.starRating)].map((_, i) => (
                  <MdOutlineStarPurple500 key={i} className="text-xl" />
                ))}
              </div>
              <div>
                <p className="text-black font-roboto font-normal text-sm 2xl:text-base">
                  {testimonial.ReviewsDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewImages;
