import Container from 'components/Res-usable/Container/Container'
import { staticvideos } from 'data/Homedata/tabdata'
import React, { useRef, useState, useEffect } from 'react'
import { BsPlayFill } from 'react-icons/bs'
import { VideoItem } from 'types/product'

const VideoGuide = ({ videos,isMotorisedCategory }: { videos?: VideoItem[],isMotorisedCategory?:boolean }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [pausedStates, setPausedStates] = useState<boolean[]>([])

  const allVideos = [
    ...staticvideos,
    ...(videos?.length ? [{
      src: videos[0].imageUrl ?? '',
      title: 'Things to Know Before You Book'
    }] : [])
  ]

  useEffect(() => {
    setPausedStates(Array(allVideos.length).fill(true))
  }, [])

  const handlePlayPause = (index: number) => {
    const video = videoRefs.current[index]
    if (!video) return

    if (video.paused) {
      video.play()
      updatePausedState(index, false)
    } else {
      video.pause()
      updatePausedState(index, true)
    }
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
        <h2 className="font-robotoSerif font-extrabold text-3xl lg:text-5xl text-center">
          A Complete Guide To
        </h2>

        <div className={`grid  gap-2 md:gap-6 justify-items-center  mx-auto ${isMotorisedCategory? "grid-cols-2 max-w-3xl": "grid-cols-3 max-w-5xl"}`}>
          {allVideos.map((video, idx) => (
            <div key={idx} className="flex flex-col space-y-3 relative w-full">
              <div
                className="p-1 sm:p-2 rounded-md border border-secondary relative cursor-pointer"
                onClick={() => handlePlayPause(idx)}
              >
                <video
                  ref={(el) => { videoRefs.current[idx] = el }}
                  className="w-full h-[200px] sm:h-[325px] object-cover rounded"
                  muted
                  loop
                  playsInline
                  controls={!pausedStates[idx]}
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {pausedStates[idx] && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 backdrop-blur text-white p-3 rounded-full">
                    <BsPlayFill size={25} />
                  </div>
                )}
              </div>
              <h3 className="text-lg sm:text-[22px] sm:font-semibold font-roboto px-2 sm:px-4 text-center sm:leading-6">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default VideoGuide
