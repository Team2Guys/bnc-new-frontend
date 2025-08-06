"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motorizeBlindData } from "data/SellerSlider";
import { FaPlay } from "react-icons/fa";

export default function MotorizeBlindCurtain() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hideBtn, setHideBtn] = useState(false);

  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => { });
      setIsPlaying(true);
      setHideBtn(true)
    } else {
      video.pause();
      setIsPlaying(false);
      setHideBtn(false)
    }
  }, []);


  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="motorizedblindcurtains mt-5 md:mt-10">

      <h2 className="text-center font-robotoSerif text-xl sm:text-4xl font-bold sm:mb-10 mb-5 text-primary px-4 md:px-0 hidden md:block">
        {motorizeBlindData.heading}
      </h2>
      <h2 className="text-center font-robotoSerif text-2xl sm:text-4xl font-bold sm:mb-10 mb-5 text-primary px-4 md:px-0 block md:hidden">
        New! Motorised Blinds And curtains
      </h2>
      {/* Video Section */}
      <div
        className="relative w-full mx-auto overflow-hidden h-[272px] sm:h-[400px]  lg:h-[744px] group cursor-pointer"
        onClick={togglePlayPause}
      >
        <video
          ref={videoRef}
          src={motorizeBlindData.videoUrl}
          className="w-full h-full object-fill"
          muted
          loop
          playsInline
          controls={false}
          autoPlay
        />

        {/* Full Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10 pointer-events-none" />

        {/* Play/Pause Button */}
        {!isPlaying && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent bubbling to video click
              togglePlayPause();
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/40 p-3 backdrop-blur-xs rounded-full shadow-md z-30 border transition"
            aria-label="play video"
          >
            <FaPlay className="text-xl text-white" />
          </button>
        )}

        {/* Buttons Over Video */}
        <div
          className={`absolute inset-0 flex flex-col sm:flex-row justify-end sm:justify-center items-center sm:items-end sm:pb-6 pb-3 gap-3 sm:gap-4 sm:pr-6 transition-opacity duration-300 z-20 ${hideBtn ? "opacity-0" : "opacity-100"
            }`}
        >
          {motorizeBlindData.buttons.map(({ label, link }, i) => (
            <Link
              key={i}
              href={link}
              className="bg-secondary hover:bg-yellow-500 text-primary font-semibold font-roboto py-2 lg:py-4 px-5 rounded-md shadow-md sm:text-base text-12 transition hover:opacity-65 "
              aria-label="moterised-video"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Features (Desktop) */}
      <div className="py-5 hidden sm:flex flex-wrap justify-center gap-20 text-center bg-secondary-foreground mx-1 xl:mx-0">
        {motorizeBlindData.features.map(({ icon, label }, i) => (
          <div key={i} className="flex flex-col items-center gap-2 relative">
            <div className="w-20 h-20 relative">
              <Image src={icon} alt={label} fill className="object-contain" loading="lazy" />
            </div>
            <p className="text-lg text-primary font-medium font-roboto">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Features (Mobile) */}
      <div className="sm:py-10 pb-8 pt-5 sm:hidden bg-secondary-foreground">
        <Slider {...sliderSettings}>
          {motorizeBlindData.features.map(({ icon, label }, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 px-2 relative"
            >
              <div className="w-10 h-10 sm:w-20 sm:h-20 relative mx-auto">
                <Image
                  src={icon}
                  alt={label}
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </div>
              <p className=" text-lg sm:text-10 text-gray-700 font-medium text-center mt-2">
                {label}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
