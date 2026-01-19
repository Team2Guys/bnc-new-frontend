'use client'

import Container from 'components/Res-usable/Container/Container'
import { blindsVideos, curtainsVideos, shuttersVideos, staticvideos } from 'data/Homedata/tabdata'
import { useRef, useState, useEffect, useMemo } from 'react'
import { BsPlayFill } from 'react-icons/bs'
import { VideoItem } from 'types/product'
import { IoClose } from 'react-icons/io5'
import { usePathname } from 'next/navigation'

const VideoGuide = ({ isMotorisedCategory }: { videos?: VideoItem[], isMotorisedCategory?: boolean }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [pausedStates, setPausedStates] = useState<boolean[]>([])
  const [showModal, setShowModal] = useState(false)
  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string } | null>(null)
  const pathname = usePathname()

  let selectedVideos: VideoItem[] = []

  if (pathname.includes('shutters')) {
    selectedVideos = shuttersVideos
  } else if (pathname.includes('blinds')) {
    selectedVideos = blindsVideos
  } else if (pathname.includes('curtains')) {
    selectedVideos = curtainsVideos
  }

const allVideos = useMemo<VideoItem[]>(() => {
  if (selectedVideos.length > 0 && staticvideos.length >= 2) {
    return [staticvideos[0], selectedVideos[0], staticvideos[1]];
  }
  return [...staticvideos];
}, [selectedVideos, staticvideos]);


  useEffect(() => {
    setPausedStates(Array(allVideos.length).fill(true))
  }, [allVideos.length])

  const handlePlayPause = (index: number) => {
    const video = videoRefs.current[index]
    if (!video) return

    video.pause()
    updatePausedState(index, true)

    setActiveVideo(allVideos[index])
    setShowModal(true)
  }

  const updatePausedState = (index: number, isPaused: boolean) => {
    setPausedStates((prev) => {
      const updated = [...prev]
      updated[index] = isPaused
      return updated
    })
  }

  return (
    <div className="bg-secondary-foreground py-6 sm:py-12 mt-10">
      <Container className="space-y-5 md:space-y-10">
        <h2 className="font-futura font-extrabold text-24 sm:text-30 lg:text-5xl text-center text-primary">
          A Complete Guide To
        </h2>

        <div className={`grid gap-2 md:gap-6 justify-items-center mx-auto ${isMotorisedCategory ? "grid-cols-3 max-w-5xl" : "grid-cols-3 max-w-5xl"}`}>
          {allVideos.map((video, idx) => (
            <div key={idx} className="flex flex-col space-y-3 relative w-full">
              <div
                className={`p-1 sm:p-2 rounded-md border border-secondary relative cursor-pointer ${idx === 1 ? 'border border-secondary' : ''}`}
                onClick={() => handlePlayPause(idx)}
              >
                <video
                  ref={(el) => { videoRefs.current[idx] = el }}
                  className="w-full h-[100px] sm:h-[230px] lg:h-[300px] xl:h-[345px] object-cover rounded"
                  muted
                  loop
                  playsInline
                  controls={!pausedStates[idx]}
                  preload="metadata"

                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {pausedStates[idx] && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#3E3F421A] border border-white bg-opacity-50 backdrop-blur text-white p-1 lg:p-3 rounded-full">
                    <BsPlayFill className='w-4 h-4 sm:h-7 sm:w-7 xl:w-10 xl:h-10' />
                  </div>
                )}
              </div>
              <h3 className="text-12 font-medium sm:text-[22px] sm:font-semibold font-roboto px-2 sm:px-4 text-center sm:leading-6">
                {video.title}
              </h3>
            </div>
          ))}
        </div>

        {showModal && activeVideo && (
          <div
            className="fixed top-0 inset-0 z-50 flex items-center justify-center bg-black/70 px-4 !m-0"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowModal(false)
                setActiveVideo(null)
              }
            }}
          >
            <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col items-center justify-center">
              <div className="relative w-full flex justify-center">
                <button
                  onClick={() => {
                    setShowModal(false)
                    setActiveVideo(null)
                  }}
                  className="absolute top-2 right-2 z-50 bg-white rounded-full p-1 hover:bg-gray-300"
                >
                  <IoClose className="text-black text-2xl" />
                </button>
                <video
                  className="w-full max-h-[75vh] rounded-lg"
                  controls
                  autoPlay
                  muted
                >
                  <source src={activeVideo.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <p className="text-white text-center py-3 font-medium">{activeVideo.title}</p>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}

export default VideoGuide
