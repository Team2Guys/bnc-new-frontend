'use client';

import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const VideoReelsSlider = dynamic(() => import('./VideoSlider'), {
  loading: () => (
    <div className="flex items-center justify-center gap-4 sm:h-[750px] h-[300px]">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="relative sm:w-[500px] sm:h-[670px] w-[150px] h-[280px] rounded-2xl bg-gray-300 animate-pulse"
        >
          <div className="absolute top-2 right-2 w-6 h-6 sm:w-12 sm:h-12 rounded-full bg-gray-400 animate-pulse" />
        </div>
      ))}
    </div>
  ),
});
export default function VideoReelsWrapper() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (inView) setShow(true);
  }, [inView]);

  return (
    <div ref={ref}>
      {show ? (
        <VideoReelsSlider />
      ) : (
        <p className="py-20 text-center">Scroll to load videos...</p>
      )}
    </div>
  );
}
