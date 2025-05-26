"use client";
import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { IProduct } from "types/types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "components/Res-usable/Container/Container";
import Link from "next/link";
import { getPath } from "utils/helperFunctions";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const SellerSlider = ({products}: {products: IProduct[]}) => {

    const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer"
    onClick={onClick}
  >
    <GrFormNext className="text-3xl xl:text-4xl text-primary transition border-2 border-white rounded-full bg-white opacity-50 hover:border-primary" />
  </div>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer"
    onClick={onClick}
  >
    <GrFormPrevious className="text-3xl xl:text-4xl text-primary transition border-2 border-white rounded-full bg-white opacity-50 hover:border-primary" />
  </div>
);
  const settings = {
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
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.1,
          arrows: false
        },
      },
    ],
  };




  return (
    <div className="bg-secondary-foreground py-5">
    <Container className="overflow-hidden best_seller_slider bg-secondary-foreground space-y-4">
      
      <div className="text-center sm:pb-5 lg:pt-8 space-y-2">
        <h3 className="sm:text-[40px] text-2xl font-robotoSerif font-bold text-primary hidden md:block">SEE OUR BEST-SELLING PRODUCTS</h3>
        <h3 className="sm:text-[40px] text-4xl font-robotoSerif font-bold text-primary block md:hidden">See Our Bestseller</h3>
       <p className="font-roboto font-normal lg:font-semibold text-16 md:text-20 text-[#3E3F42] mb-3 lg:my-7">Top-Selling Products to Inspire You!</p>
      </div>
        
      <Slider {...settings}>
        {products.slice(0,7).map((item: IProduct, index) => (

          <div key={index} className="px-2 xl:px-4">
            <Link href={getPath(item)}>
              <div className="bg-white overflow-hidden rounded-xl md:p-3">
                <div className="relative w-full h-[280px] md:h-[365px] rounded-xl">
                  <Image
                    src={item.posterImage.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="pt-4 text-center md:text-start ">
                  <h3 className="text-lg font-semibold mb-1 text-primary text-24 md:text-20 font-robotoSerif">{item.title}</h3>
                  <p className="text-secondary font-normal md:text-16 text-20 font-roboto">
                    <span className="text-primary">Starting from</span> {item.price}AED
                  </p>
                </div>
              </div>
            </Link>
          </div>

        ))}
      </Slider>
      <Link
          href="/book-free-visit" 
          className="bg-secondary font-roboto text-primary font-medium text-lg sm:text-[14px] px-5 py-2 rounded-lg block w-fit text-center mx-auto mt-5 hover:opacity-65"
        >
          Book a Free Visit
        </Link>
    </Container>
    </div>
  );
};

export default SellerSlider;
