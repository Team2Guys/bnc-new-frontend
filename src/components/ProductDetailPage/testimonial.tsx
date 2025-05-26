'use client'
import Container from 'components/Res-usable/Container/Container'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MdOutlineStarPurple500 } from 'react-icons/md'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { fetchReviews } from 'config/fetch'
import { IREVIEWS } from 'types/general'

const settings = {
  dots: true,
  infinite: true,
  autoplay:true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: false,
  responsive: [
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
}

const Testimonial = () => {
  const [reviews, setReviews] = useState<IREVIEWS[]>([])

  useEffect(() => {
    fetchReviews().then((data) => setReviews(data))
  }, [])

  return (
    <div className="mt-10 space-y-5">
      <p className="font-bold font-robotoSerif text-[40px] hidden md:block text-center">
        Testimonials
      </p>
      <div className="bg-secondary-foreground py-10 w-full">
        <Container className="grid grid-cols-12 gap-6">
          {/* Left Section */}
          <div className="col-span-12 md:col-span-4 flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
            <Image
              src="/assets/images/googleReview/google.png"
              width={235}
              height={34}
              alt="Google"
            />
            <div className="flex justify-center md:justify-start">
              {[...Array(5)].map((_, i) => (
                <MdOutlineStarPurple500
                  key={i}
                  className="text-[#FFD800] text-[30px]"
                />
              ))}
            </div>
            <p className="font-roboto text-xl">
              Rating <span className="font-medium">4.9 | 760</span> reviews <br />
              Window treatment store
            </p>
          </div>

          {/* Right Section */}
          <div className="col-span-12 md:col-span-8">
            <div className="custom-test">
              <Slider {...settings}>
                {reviews?.map((item:IREVIEWS, index:number) => (
                  <div key={index} className="px-4 sm:mb-2 ">
                    <div className=" space-y-3 h-full">
                      <p className="font-robotoSerif font-bold text-xl text-center sm:text-start">{item.name}</p>
                      <p className="font-roboto text-gray-700 text-sm md:text-base text-center sm:text-start">{item.ReviewsDescription}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Testimonial
