'use client';
import Container from 'components/Res-usable/Container/Container';
import React, { useEffect, useState } from 'react';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { fetchReviews } from 'config/fetch';
import { IREVIEWS } from 'types/general';
import SlickSlider from 'components/Blogs/slick-slider';

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  swipeToSlide: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 640,
      settings: { slidesToShow: 1 },
    },
  ],
};

const truncateText = (text: string, limit: number) => {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + '...';
};
const Testimonial = () => {
  const [reviews, setReviews] = useState<IREVIEWS[]>([]);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [charLimit, setCharLimit] = useState(140);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      setCharLimit(width < 500 ? 100 : 150);
    }
  }, []);
  useEffect(() => {
    fetchReviews().then((data) => setReviews(data));
  }, []);
  const toggleExpand = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  return (
    <>
      {reviews && (
        <div className="my-10 space-y-5">
          <h2 className="font-bold font-futura text-[40px] hidden md:block text-center text-primary">
            Testimonials
          </h2>
          <div className="bg-secondary-foreground py-10 w-full">
            <Container className="grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-4 flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
                <div className="flex justify-center md:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <MdOutlineStarPurple500
                      key={i}
                      className="text-[#FFD800] text-[30px]"
                    />
                  ))}
                </div>
                <p className="font-roboto text-xl">
                  Rating <span className="font-medium">4.9 | 794</span> reviews{' '}
                  <br />
                  Window treatment store
                </p>
              </div>
              <div className="col-span-12 md:col-span-8">
                <SlickSlider settings={settings}>
                  {reviews &&
                    reviews.map((item, index) => {
                      const isExpanded = expanded[index];
                      const content = isExpanded
                        ? item.ReviewsDescription
                        : truncateText(item.ReviewsDescription, charLimit);

                      return (
                        <div key={index} className="px-4 sm:mb-2">
                          <div className="space-y-3 h-full">
                            <p className="font-futura font-bold text-xl text-center sm:text-start">
                              {item.name}
                            </p>
                            <div className="flex justify-center xs:justify-start">
                              {[...Array(item.starRating)].map((_, i) => (
                                <MdOutlineStarPurple500
                                  key={i}
                                  className="text-[#FFD800] text-xl"
                                />
                              ))}
                            </div>
                            <p className="font-roboto text-primary text-sm md:text-base text-center sm:text-start">
                              &quot;{content}&quot;
                              {item.ReviewsDescription.length > charLimit && (
                                <button
                                  onClick={() => toggleExpand(index)}
                                  className="ml-1 text-primary text-sm underline"
                                >
                                  {isExpanded ? 'Read less' : 'Read more'}
                                </button>
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </SlickSlider>
              </div>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default Testimonial;
