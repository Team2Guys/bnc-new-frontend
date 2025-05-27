'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { IREVIEWS } from 'types/general';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

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

   return (
      <>
         <div className="flex justify-between gap-2 mt-2">
            {visibleImages.map((item, index) => {
               const isLastVisible = index === visibleImages.length - 1;
               return (
                  <div key={index} className="relative size-16 cursor-pointer" onClick={() => handleImageClick(index)}>
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
                  <div className='w-full md:w-2/3 xl:w-3/4 h-full bg-black relative'>
                     <Swiper
                        modules={[Navigation,]}
                        navigation
                        initialSlide={activeIndex}
                        className="w-full h-full testimonial-slider"
                     >
                        {testimonial.ReviewsImages.map((item, index) => (
                           <SwiperSlide key={index}>
                              <div className="relative w-full h-full">
                                 <Image
                                    src={item.imageUrl}
                                    alt={`Slide ${index + 1}`}
                                    fill
                                    className="object-contain"
                                 />
                              </div>
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  </div>
                  <div className='w-full md:w-1/3 xl:w-1/4 h-[40vh] md:h-full bg-white drop-shadow-xl p-4 flex flex-col gap-4'>
                     <div className="flex justify-between items-center gap-2">
                        <div className='flex items-center gap-2'>
                           <Image
                              src={testimonial?.posterImageUrl || '/assets/images/dummy-avatar.jpg'}
                              alt="testimonial-image"
                              width={64}
                              height={64}
                              className="size-12 xs:size-10 rounded-full object-cover"
                           />
                           <div className='flex flex-col gap-1'>
                              <h3 className="text-12 xs:text-14 2xl:text-lg font-bold">
                                 {testimonial.name}
                              </h3>
                              <p className='text-12 text-[#8a8a8a]'>
                                 {(testimonial.reviewDate || testimonial.createdAt) &&
                                    new Date(testimonial.reviewDate || testimonial.createdAt).toLocaleDateString('en-GB', {
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
                           <MdOutlineStarPurple500 key={i} className='text-xl' />
                        ))}
                     </div>
                     <div>
                        <p className='text-black font-roboto font-normal text-sm 2xl:text-base'>{testimonial.ReviewsDescription}</p>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default ReviewImages;
