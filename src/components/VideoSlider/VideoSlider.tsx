'use client'

import { useState, useRef, useEffect, useCallback, useMemo, TouchEvent, SyntheticEvent } from 'react'
import dynamic from 'next/dynamic'
import Container from 'components/Res-usable/Container/Container'
import VideoIcon from '../../../public/assets/images/videoicon.webp'
import Image from 'next/image'
import { Reel } from 'types/types'

// Dynamically import NeedHelp to reduce TBT during initial render
const NeedHelp = dynamic(() => import('components/NeedHelp/NeedHelp'), { ssr: false })

export default function VideoReelsSlider({ reelsData }: { reelsData: Reel[] }) {
  const [activeIndex, setActiveIndex] = useState(2)
  const [isMobile, setIsMobile] = useState(false)
  const [popupVideoIndex, setPopupVideoIndex] = useState<number | null>(null)
  const [videoSize, setVideoSize] = useState<{ width: number; height: number } | null>(null)

  const totalVideos = reelsData.length


  const videoRefs = useRef<HTMLVideoElement[]>([])
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const minSwipeDistance = 50

  const goToPrevious = useCallback(
    () => setActiveIndex((prev) => (prev === 0 ? totalVideos - 1 : prev - 1)),
    [totalVideos]
  )

  const goToNext = useCallback(
    () => setActiveIndex((prev) => (prev === totalVideos - 1 ? 0 : prev + 1)),
    [totalVideos]
  )

  // Debounced resize to avoid layout thrashing
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()

    const handleResize = () => {
      window.requestAnimationFrame(checkMobile)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (popupVideoIndex !== null) return; // 🚫 Stop autoplay when popup is open

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex, popupVideoIndex, goToNext]);

  // Efficiently play/pause only affected video refs
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play().catch(() => { })
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })
  }, [activeIndex])

  // Manage body scroll when popup is shown
  useEffect(() => {
    document.body.style.overflow = popupVideoIndex !== null ? 'hidden' : ''
    if (popupVideoIndex === null) {
      setVideoSize(null)
    }
  }, [popupVideoIndex])

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.changedTouches[0].clientX
  }

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.changedTouches[0].clientX

    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current
      if (distance > minSwipeDistance) {
        goToNext()
      } else if (distance < -minSwipeDistance) {
        goToPrevious()
      }
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  const getPositionClass = useCallback(
    (index: number) => {
      const left2 = (activeIndex - 2 + totalVideos) % totalVideos
      const left1 = (activeIndex - 1 + totalVideos) % totalVideos
      const right1 = (activeIndex + 1) % totalVideos
      const right2 = (activeIndex + 2) % totalVideos

      if (index === activeIndex) return 'z-30 scale-100 opacity-100'
      if (index === left1) return 'z-20 scale-[0.85] opacity-1 -translate-x-[60%]'
      if (index === left2) return 'z-10 scale-[0.75] opacity-1 -translate-x-[110%]'
      if (index === right1) return 'z-20 scale-[0.85] opacity-1 translate-x-[60%]'
      if (index === right2) return 'z-10 scale-[0.75] opacity-1 translate-x-[110%]'
      return 'hidden'
    },
    [activeIndex, totalVideos]
  )

  const handleLoadedMetadata = useCallback(
    (e: SyntheticEvent<HTMLVideoElement, Event>) => {
      const video = e.currentTarget
      const naturalWidth = video.videoWidth
      const naturalHeight = video.videoHeight

      const maxWidth = window.innerWidth * 0.9
      const maxHeight = window.innerHeight * 0.9

      let width = naturalWidth
      let height = naturalHeight

      if (width > maxWidth) {
        const ratio = maxWidth / width
        width = maxWidth
        height = height * ratio
      }
      if (height > maxHeight) {
        const ratio = maxHeight / height
        height = maxHeight
        width = width * ratio
      }

      setVideoSize({ width, height })
    },
    []
  )

  // Memoized rendering to reduce re-renders
  const videoElements = useMemo(
    () =>
      reelsData.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            setActiveIndex(index)
            setTimeout(() => {
              setPopupVideoIndex(index)
            }, 100)
          }}
          className={`absolute transition-all duration-500 ease-in-out cursor-pointer ${getPositionClass(
            index
          )}`}
        >
          <div className="relative sm:w-[500px] sm:h-[670px] w-[150px] h-[280px] rounded-2xl overflow-hidden shadow-lg">
            <div className="absolute top-2 right-2 z-40">
              <Image
                src={VideoIcon}
                alt="icon"
                className="w-6 h-6 sm:w-12 sm:h-12 object-contain"
                loading="lazy"
              />
            </div>
            <video
              ref={(el) => {
                if (el) videoRefs.current[index] = el
              }}
              key={item.videoUrl}
              src={item.videoUrl}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>
        </div>
      )),
    [reelsData, getPositionClass]
  )

  return (
    <>
      {isMobile && <NeedHelp />}

      <div className="relative mt-4">
        <div className="sm:py-6 py-4 text-center font-bold sm:w-full w-52 mx-auto">
          <p className="font-robotoSerif sm:text-4xl text-xl text-primary font-bold">
            Press Play on Style Quick Reels!
          </p>
        </div>

        <Container>
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="relative flex items-center justify-center sm:h-[750px] h-[300px] overflow-hidden"
          >
            {videoElements}
          </div>
        </Container>
      </div>

      {popupVideoIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={() => setPopupVideoIndex(null)}
        >
          <div
            className="relative bg-black rounded-lg shadow-lg"
            style={{
              width: videoSize?.width ?? 'auto',
              height: videoSize?.height ?? 'auto',
              maxWidth: '90vw',
              maxHeight: '90vh',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPopupVideoIndex(null)}
              className="absolute top-3 right-3 z-50 text-white bg-gray-800 hover:bg-gray-700 rounded-full px-2.5 py-1 focus:outline-none"
              aria-label="Close video"
            >
              ✕
            </button>
            <video
              key={reelsData[popupVideoIndex].videoUrl}
              src={reelsData[popupVideoIndex].videoUrl}
              className="rounded-lg object-contain"
              controls
              autoPlay
              onLoadedMetadata={handleLoadedMetadata}
            />
          </div>
        </div>
      )}
    </>
  )
}
