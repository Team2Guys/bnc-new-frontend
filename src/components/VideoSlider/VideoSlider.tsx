
'use client'
import React, { useState, useRef, useEffect } from "react"
import { reelsData } from "data/SellerSlider"
import Container from "components/Res-usable/Container/Container"
import NeedHelp from "components/NeedHelp/NeedHelp"
import VideoIcon from "../../../public/assets/images/videoicon.webp"

import Image from "next/image"

export default function VideoReelsSlider() {
  const [activeIndex, setActiveIndex] = useState(2)
  const [isMobile, setIsMobile] = useState(false)
  const [popupVideoIndex, setPopupVideoIndex] = useState<number | null>(null)
  const [videoSize, setVideoSize] = useState<{ width: number; height: number } | null>(null)

  const totalVideos = reelsData.length

  const videoRefs = useRef<HTMLVideoElement[]>([])
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)
  const minSwipeDistance = 50

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.play()
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })
  }, [activeIndex])

  useEffect(() => {
    if (popupVideoIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      setVideoSize(null) 
    }
  }, [popupVideoIndex])

  const goToPrevious = () =>
    setActiveIndex((prev) => (prev === 0 ? totalVideos - 1 : prev - 1))

  const goToNext = () =>
    setActiveIndex((prev) => (prev === totalVideos - 1 ? 0 : prev + 1))

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.changedTouches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
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

  const getPositionClass = (index: number) => {
    const left2 = (activeIndex - 2 + totalVideos) % totalVideos
    const left1 = (activeIndex - 1 + totalVideos) % totalVideos
    const right1 = (activeIndex + 1) % totalVideos
    const right2 = (activeIndex + 2) % totalVideos

    if (index === activeIndex) {
      return "z-30 scale-100 opacity-100"
    } else if (index === left1) {
      return "z-20 scale-[0.85] opacity-1 -translate-x-[60%]"
    } else if (index === left2) {
      return "z-10 scale-[0.75] opacity-1 -translate-x-[110%]"
    } else if (index === right1) {
      return "z-20 scale-[0.85] opacity-1 translate-x-[60%]"
    } else if (index === right2) {
      return "z-10 scale-[0.75] opacity-1 translate-x-[110%]"
    } else {
      return "hidden"
    }
  }

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
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
  }

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
            {reelsData.map((item, index) => (
              <div
                key={index}
                onClick={() => setPopupVideoIndex(index)}
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
                    preload="metadata"
                  />
                </div>
              </div>
            ))}
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
              width: videoSize?.width ?? "auto",
              height: videoSize?.height ?? "auto",
              maxWidth: "90vw",
              maxHeight: "90vh",
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
