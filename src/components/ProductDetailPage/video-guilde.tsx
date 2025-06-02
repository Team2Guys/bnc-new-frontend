import Container from 'components/Res-usable/Container/Container'
import { curtainsVideos, shuttersVideos, staticvideos } from 'data/Homedata/tabdata'
import React, { useRef, useState, useEffect } from 'react'
import { BsPlayFill } from 'react-icons/bs'
import { VideoItem } from 'types/product'
import { IoClose } from 'react-icons/io5'
import { usePathname } from 'next/navigation'

const VideoGuide = ({ videos, isMotorisedCategory }: { videos?: VideoItem[], isMotorisedCategory?: boolean }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [pausedStates, setPausedStates] = useState<boolean[]>([])
  const [showModal, setShowModal] = useState(false)
  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string } | null>(null)
  const pathname = usePathname()

const selectedVideos =
  pathname.includes('shutters')
    ? shuttersVideos
    : pathname.includes('curtains')
    ? curtainsVideos
    : staticvideos;

const allVideos = [
  ...selectedVideos,
  ...(videos?.length
    ? [{
        src: videos[0].imageUrl ?? '',
        title: 'Why Go Motorized?'
      }]
    : [])
];


  useEffect(() => {
    setPausedStates(Array(allVideos.length).fill(true))
  }, [])

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
        <h2 className="font-robotoSerif font-extrabold text-24 sm:text-30 lg:text-5xl text-center text-primary">
          A Complete Guide To
        </h2>

        <div className={`grid gap-2 md:gap-6 justify-items-center mx-auto ${isMotorisedCategory ? "grid-cols-2 max-w-3xl" : "grid-cols-3 max-w-5xl"}`}>
          {allVideos.map((video, idx) => (
            <div key={idx} className="flex flex-col space-y-3 relative w-full">
              <div
                className="p-1 sm:p-2 rounded-md border border-secondary relative cursor-pointer"
                onClick={() => handlePlayPause(idx)}
              >
                <video
                  ref={(el) => { videoRefs.current[idx] = el }}
                  className="w-full h-[100px] sm:h-[230px] lg:h-[300px] xl:h-[345px] object-cover rounded"
                  muted
                  loop
                  playsInline
                  controls={!pausedStates[idx]}
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
         className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 px-4"
          onClick={(e) => {
          if (e.target === e.currentTarget) {
        setShowModal(false)
        setActiveVideo(null)
          }
          }}
        >
          <div className="relative bg-black rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
              <button
                onClick={() => {
                  setShowModal(false)
                  setActiveVideo(null)
                }}
                className="absolute top-3 right-3 z-50 text-white text-2xl"
              >
                <IoClose />
              </button>
              <video
                className="w-full h-full object-contain"
                controls
                autoPlay
              >
                <source src={activeVideo.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-white text-center py-2 font-medium">{activeVideo.title}</p>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}

export default VideoGuide
