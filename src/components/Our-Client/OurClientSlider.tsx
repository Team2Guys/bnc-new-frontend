'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import Image from 'next/image';

const ClientLogoGridSlider = ({ OurClientImage }: { OurClientImage: any }) => {
   return (
      <div className='relative'>
         <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={2}
            autoplay={{ delay: 2000 }}
            loop={true}
            pagination={{
               el: '.custom-pagination',
               clickable: true,
               renderBullet: (_, className) => {
                  return `<span class="${className} custom-dot"></span>`;
               },
            }}
         >
            {OurClientImage.map((image: any, index: number) => (
               <SwiperSlide key={index}>
                  <div className="bg-primary h-16 p-5 flex justify-center items-center">
                     <Image
                        className="object-contain !relative"
                        src={image.src}
                        alt={image.alt}
                        fill
                       priority
                     />
                  </div>
               </SwiperSlide>
            ))}
         </Swiper>
         <div className="custom-pagination !flex justify-center mt-4 gap-2"></div>
      </div>
   );
};

export default ClientLogoGridSlider;
