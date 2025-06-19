'use client'

import Container from 'components/Res-usable/Container/Container'
import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineStarPurple500 } from 'react-icons/md'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { fetchReviews } from 'config/fetch'
import { IREVIEWS } from 'types/general'

const getTruncatedText = (text: string, wordLimit: number) => {
  const words = text.split(' ')
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(' ') + '...'
    : text
}

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
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
  const [expandedStates, setExpandedStates] = useState<{ [key: number]: boolean }>({})
  const [isOverflowing, setIsOverflowing] = useState<{ [key: number]: boolean }>({})
  const textRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const [wordLimit, setWordLimit] = useState(28)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      setWordLimit(width < 500 ? 26 : 28)
    }
  }, [])

  useEffect(() => {
    const result: { [key: number]: boolean } = {}
    textRefs.current.forEach((ref, index) => {
      if (ref) {
        const lineHeight = parseFloat(getComputedStyle(ref).lineHeight)
        const maxHeight = lineHeight * 3
        result[index] = ref.scrollHeight > maxHeight
      }
    })
    setIsOverflowing(result)
  }, [reviews])

  const toggleExpand = (index: number) => {
    setExpandedStates(prev => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  useEffect(() => {
    fetchReviews().then(data => setReviews(data))
  }, [])

  return (
    <div className="mt-10 space-y-5">
      <h2 className="font-bold font-robotoSerif text-[40px] hidden md:block text-center">
        Testimonials
      </h2>
      <div className="bg-secondary-foreground py-10 w-full">
        <Container className="grid grid-cols-12 gap-6">
          {/* Left Section */}
          <div className="col-span-12 md:col-span-4 flex flex-col items-center md:items-start space-y-4 text-center md:text-left">
            <div className="flex justify-center md:justify-start">
              {[...Array(5)].map((_, i) => (
                <MdOutlineStarPurple500 key={i} className="text-[#FFD800] text-[30px]" />
              ))}
            </div>
            <p className="font-roboto text-xl">
              Rating <span className="font-medium">4.9 | 773</span> reviews <br />
              Window treatment store
            </p>
          </div>

          {/* Right Section - Slider */}
          <div className="col-span-12 md:col-span-8">
            <div className="custom-test">
              <Slider {...settings}>
                {reviews.map((item, index) => {
                  const isExpanded = expandedStates[index]
                  const showTruncation = isOverflowing[index] && !isExpanded
                  const content = showTruncation
                    ? getTruncatedText(item.ReviewsDescription, wordLimit)
                    : item.ReviewsDescription

                  return (
                    <div key={index} className="px-4 sm:mb-2">
                      <div className="space-y-3 h-full">
                        <p className="font-robotoSerif font-bold text-xl text-center sm:text-start">
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
                        <div className="relative">
                          <p
                            ref={el => {
                              textRefs.current[index] = el
                            }}
                            className="font-roboto text-gray-700 text-sm md:text-base text-center sm:text-start transition-all duration-300"
                          >
                            &quot;{content}{isOverflowing[index] && (
                              <button
                                onClick={() => toggleExpand(index)}
                                className="text-gray-700 text-sm underline"
                              >
                                {' '}{isExpanded ? 'Read less' : 'Read more'}
                              </button>
                            )}&quot;
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </Slider>
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Testimonial
