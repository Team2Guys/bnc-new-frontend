'use client'
import React, { useState, useMemo, useEffect } from 'react'
import Container from 'components/Res-usable/Container/Container'
import Image from 'next/image'

interface PrivacyImage {
  imageUrl: string
  alt?:string
}

interface InformationProps {
  privarcyImage: PrivacyImage
  privacySectoin: Array<{
    specsHeading: string
    specsDetails: string
  }>
}

const Information = ({ privarcyImage, privacySectoin }: InformationProps) => {
  const [visibleCount, setVisibleCount] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Show all on desktop
  useEffect(() => {
    if (isDesktop) {
      setVisibleCount(privacySectoin.length - 1)
    } else {
      setVisibleCount(0)
    }
  }, [isDesktop, privacySectoin.length])

  const handleReadMore = () => {
    const total = privacySectoin.length - 1
    setVisibleCount(prev => Math.min(prev + 2, total))
  }

  const handleReadLess = () => setVisibleCount(0)

  const { visibleSections, hasMore, hasVisible } = useMemo(() => {
    const extraSections = privacySectoin.slice(1)
    const visible = extraSections.slice(0, visibleCount)
    const total = extraSections.length
    return {
      visibleSections: visible,
      hasMore: visibleCount < total,
      hasVisible: visibleCount > 0,
      isFullyVisible: visibleCount >= total
    }
  }, [privacySectoin, visibleCount])

  return (
    <>
      {privacySectoin && privacySectoin.length > 0 && (
        <div className="bg-secondary-foreground py-10 mt-10">
          <Container className="grid grid-cols-12 gap-6">
            {/* Text Section */}
            <div className="col-span-12 md:col-span-6 space-y-2 order-2 md:order-1">
              {/* First always-visible section */}
              <div>
                <h2 className="font-futura font-bold text-primary text-2xl md:text-[30px] xl:text-[40px] leading-[120%]">
                  {privacySectoin[0].specsHeading}
                </h2>
                <p className='font-roboto text-[16px] text-primary'>{privacySectoin[0].specsDetails}</p>
              </div>

              {/* Extra sections */}
              {visibleSections.map((item, index) => (
                <div key={index}>
                  <h3 className="font-futura font-medium md:font-bold text-xl md:text-2xl leading-[120%]">
                    {item.specsHeading}
                  </h3>
                  <p>{item.specsDetails}</p>
                </div>
              ))}

              {/* Buttons (mobile only) */}
              {!isDesktop && (
                <div className="pt-5 md:pt-10 space-x-4">
                  {/* Show only one button at a time */}
                  {hasMore && (
                    <button
                      onClick={handleReadMore}
                      className="p-2 md:text-[22px] xl:p-4 font-medium text-secondary border rounded-md border-primary hover:border-secondary hover:bg-secondary hover:text-primary max-sm:px-10"
                    >
                      Read More
                    </button>
                  )}
                  {!hasMore && hasVisible && (
                    <button
                      onClick={handleReadLess}
                      className="p-2 md:text-[22px] xl:p-4 font-medium text-secondary border rounded-md border-primary hover:border-secondary hover:bg-secondary hover:text-primary max-sm:px-10"
                    >
                      Read Less
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Image Section */}
            {privarcyImage?.imageUrl && (
              <div className="col-span-12 md:col-span-6 order-1 md:order-2 h-56 sm:h-96 md:h-[600px] w-full">
                <Image
                  className="object-cover !relative"
                  src={privarcyImage.imageUrl}
                  fill
                  alt={privarcyImage.alt ||"Category Images"}
                  sizes='100vw'
                />
              </div>
            )}
          </Container>
        </div>
      )}
    </>
  )
}

export default Information
