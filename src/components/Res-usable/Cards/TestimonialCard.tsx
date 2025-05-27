'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { IREVIEWS } from 'types/general';
import { motion } from 'framer-motion';
import ReviewImages from './ReviewImages';

const TestimonialCard = ({
   testimonial,
}: {
   testimonial: IREVIEWS;
}) => {
   const [isExpanded, setIsExpanded] = useState(false);
   const [hasOverflow, setHasOverflow] = useState(false);
   const contentRef = useRef<HTMLParagraphElement>(null);

   useEffect(() => {
      if (contentRef.current) {
         setHasOverflow(contentRef.current.scrollHeight > 95);
      }
   }, [testimonial.ReviewsDescription]);

   return (
      <div className='grid grid-cols-1 bg-transparent p-4 2xl:p-6 lg:mb-5 h-fit'>
         <div className="flex justify-between items-center gap-2">
            <div className='flex items-center gap-2'>
               <Image
                  src={testimonial?.posterImageUrl || '/assets/images/dummy-avatar.jpg'}
                  alt="testimonial-image"
                  width={64}
                  height={64}
                  className="size-12 xs:size-16 rounded-full object-cover"
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

         <div className="mt-2">
            <div className="flex text-[#FCD503]">
               {[...Array(testimonial.starRating)].map((_, i) => (
                  <MdOutlineStarPurple500 key={i} className='text-xl' />
               ))}
            </div>

            <div className="relative mt-2">
               <motion.p
                  ref={contentRef}
                  layout
                  className={`text-black font-roboto font-normal text-sm xsm:text-base overflow-hidden transition-all duration-700 ease-in-out ${isExpanded ? 'max-h-[1000px]' : 'max-h-[95px]'
                     }`}
               >
                  {testimonial.ReviewsDescription}
               </motion.p>

               {hasOverflow && (
                  <button
                     className="mt-1 underline"
                     onClick={() => setIsExpanded(!isExpanded)}
                  >
                     {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
               )}
            </div>
            <ReviewImages testimonial={testimonial} />
         </div>
      </div>
   );
};

export default TestimonialCard;
