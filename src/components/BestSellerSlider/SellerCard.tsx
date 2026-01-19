"use client";
import { useState, useCallback, useMemo } from "react";
import Image from "next/image";
import { IProduct } from "types/types";
import Container from "components/Res-usable/Container/Container";
import Link from "next/link";
import { getPath } from "utils/helperFunctions";
import { orderedTitles } from "data/new-data";
import SlickSlider from "components/Blogs/slick-slider";
import "style/home-slider.css"

const SellerSlider = ({ products }: { products: IProduct[] }) => {
  const [isDragging, setIsDragging] = useState(false);
  const filteredAndSortedProducts = useMemo(() =>
      orderedTitles
        .map((title) =>
          products.find((item) => item.title.toLowerCase() === title.toLowerCase())
        )
        .filter(Boolean) as IProduct[],
    [products]
  );
  const sliderSettings = useMemo(() => ({
    dots: false,
    infinite: true,
    slidesToShow: 4,
    swipeToSlide: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 800,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1.1, arrows: false },
      },
    ],
  }), []);
  const handleMouseUp = useCallback((item: IProduct) => {
    if (!isDragging) {
      window.location.href = getPath(item);
    }
  }, [isDragging]);

  return (
    <div className="bg-secondary-foreground py-5">
      <Container className="overflow-hidden best_seller_slider bg-secondary-foreground space-y-4">
        <div className="text-center sm:pb-5 lg:pt-8 space-y-2">
          <h3 className="lg:text-[40px] text-2xl font-futura font-bold text-primary hidden md:block">
            SEE OUR BEST-SELLING PRODUCTS
          </h3>
          <h3 className="sm:text-[40px] text-4xl font-futura font-bold text-primary block md:hidden">
            See Our Bestseller
          </h3>
          <p className="font-roboto font-normal text-base md:text-xl text-primary mb-3 lg:my-7">
            Top-Selling Products to Inspire You!
          </p>
        </div>
        <SlickSlider settings={sliderSettings}>
          {filteredAndSortedProducts.map((item, index) => (
            <div key={item.id || index}>
              <div
                onMouseDown={() => setIsDragging(false)}
                onMouseMove={() => setIsDragging(true)}
                onMouseUp={() => handleMouseUp(item)}
              >
                <div className="bg-white overflow-hidden rounded-xl md:p-3 cursor-pointer">
                  <div className="relative w-full h-[280px] md:h-[345px] rounded-xl">
                <Image
               src={item.posterImage.imageUrl.replace('/upload/', '/upload/w_296,f_auto,q_auto/')}
              alt={item.title}
              fill
              className="rounded-xl"
              />

                </div>
                  <div className="pt-4 text-center md:text-start sm:px-0 px-2">
                    <h3 className="font-medium mb-1 text-primary text-base md:text-xl font-futura min-h-14">
                      {item.title}
                    </h3>
                    <p className="text-secondary font-normal md:text-base text-base font-roboto sm:px-0 px-4">
                      <span className="text-primary">Starting from</span>{" "}
                      {item.posterImage.pricing} AED{" "}
                      <span className="text-primary text-base">{item.posterImage.dimentions}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </SlickSlider>
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
