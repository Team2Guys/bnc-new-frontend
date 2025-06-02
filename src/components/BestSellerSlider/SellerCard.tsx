"use client";
import React, { useState, useCallback, useMemo } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { IProduct } from "types/types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "components/Res-usable/Container/Container";
import Link from "next/link";
import { getPath } from "utils/helperFunctions";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { orderedTitles } from "data/new-data";

const SellerSlider = ({ products }: { products: IProduct[] }) => {
  const [isDragging, setIsDragging] = useState(false);

  // 💡 Memoize to prevent recalculating on each render
  const filteredAndSortedProducts = useMemo(
    () =>
      orderedTitles
        .map((title) =>
          products.find((item) => item.title.toLowerCase() === title.toLowerCase())
        )
        .filter(Boolean) as IProduct[],
    [products]
  );

  const NextArrow = useCallback(({ onClick }: { onClick?: () => void }) => (
    <div
      className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <GrFormNext className="text-3xl xl:text-4xl text-primary transition border-2 border-white rounded-full bg-white opacity-50 hover:border-primary" />
    </div>
  ), []);

  const PrevArrow = useCallback(({ onClick }: { onClick?: () => void }) => (
    <div
      className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <GrFormPrevious className="text-3xl xl:text-4xl text-primary transition border-2 border-white rounded-full bg-white opacity-50 hover:border-primary" />
    </div>
  ), []);

  const sliderSettings = useMemo(() => ({
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1.1, arrows: false },
      },
    ],
  }), [NextArrow, PrevArrow]);

  // 💡 Callback to minimize re-renders
  const handleMouseUp = useCallback((item: IProduct) => {
    if (!isDragging) {
      window.location.href = getPath(item);
    }
  }, [isDragging]);

  return (
    <div className="bg-secondary-foreground py-5">
      <Container className="overflow-hidden best_seller_slider bg-secondary-foreground space-y-4">
        <div className="text-center sm:pb-5 lg:pt-8 space-y-2">
          <h3 className="lg:text-[40px] text-2xl font-robotoSerif font-bold text-primary hidden md:block">
            SEE OUR BEST-SELLING PRODUCTS
          </h3>
          <h3 className="sm:text-[40px] text-4xl font-robotoSerif font-bold text-primary block md:hidden">
            See Our Bestseller
          </h3>
          <p className="font-roboto font-normal lg:font-semibold text-16 md:text-20 text-[#3E3F42] mb-3 lg:my-7">
            Top-Selling Products to Inspire You!
          </p>
        </div>

        <Slider
          {...sliderSettings}
          beforeChange={() => setIsDragging(true)}
          afterChange={() => setIsDragging(false)}
        >
          {filteredAndSortedProducts.map((item, index) => (
            <div key={item.id || index} className="pl-5 xl:px-4">
              <div
                onMouseDown={() => setIsDragging(false)}
                onMouseMove={() => setIsDragging(true)}
                onMouseUp={() => handleMouseUp(item)}
              >
                <div className="bg-white overflow-hidden rounded-xl md:p-3 cursor-pointer">
                  <div className="relative w-full h-[280px] md:h-[365px] rounded-xl">
                <Image
               src={item.posterImage.imageUrl.replace('/upload/', '/upload/w_296,f_auto,q_auto/')}
              alt={item.title}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 221px, 296px"
              />

                </div>
                  <div className="pt-4 text-center md:text-start sm:px-0 px-2">
                    <h3 className="font-semibold mb-1 text-primary text-16 md:text-20 font-robotoSerif min-h-14">
                      {item.title}
                    </h3>
                    <p className="text-secondary font-normal md:text-16 text-16 font-roboto sm:px-0 px-4">
                      <span className="text-primary">Starting from</span>{" "}
                      {item.posterImage.pricing} AED{" "}
                      <span className="text-primary text-16">{item.posterImage.dimentions}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <Link
          href="/request-appointment/"
          className="bg-secondary font-roboto text-primary font-medium text-lg sm:text-[14px] px-5 py-2 rounded-lg block w-fit text-center mx-auto mt-5 hover:opacity-65"
        >
          Book a Free Visit
        </Link>
      </Container>
    </div>
  );
};

export default SellerSlider;
