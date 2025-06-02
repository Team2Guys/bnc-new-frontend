
import Container from "components/Res-usable/Container/Container";
import { ReviewBackground, ReviewBackgrounddashktop } from "components/svg/review-background";
import { customerReview } from "data/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";

export default function ReviewBanner() {


  return (
    <div className="pt-5 lg:pt-10 bg-secondary-foreground">
      <Container className="grid grid-cols-1 md:grid-cols-2">
        <div className="md:max-w-screen-xs flex flex-col md:flex-row gap-6 items-center md:items-start relative mt-2">
          <Image src={"/assets/images/logomain.webp"} className="relative top-0 left-0 hidden md:block" width={100} height={40} alt="logo" />
          <div className="space-y-3 text-center">
            <Image src={"/assets/images/googleReview/google.png"} width={235} height={34} alt="logo" />
            <div className="flex  justify-center items-center">
              {Array(5).fill(null).map((star, index) => (
                <MdOutlineStarPurple500 key={index} className="text-[#FFD800] text-36" />
              ))}
            </div>
            <p className="font-roboto text-lg  md:text-xl">Rating <span className="font-medium">4.9 | 773</span> reviews <br /> Window treatment store</p>
          </div>
        </div>
        <div className="space-y-3 text-center md:text-start">
          <p className="font-bold font-robotoSerif text-lg md:text-2xl text-primary pt-5 md:pt-1 xl:pt-0">
            {customerReview.name}
          </p>
          <div className="font-roboto-serif font-medium text-lg md:text-xl text-primary px-6 sm:px-0 leading-7">
            <p>
              {customerReview.review}
            </p>
          </div>
          <Link
            target="_blank"
            href={customerReview.reviewLink}
            aria-label="Reviews"
            className="border border-primary py-2 px-4 rounded-md font-roboto font-bold text-22 hidden md:block w-fit"
          >
            Go to Google Reviews
          </Link>
        </div>
      </Container>
      <div className="block sm:hidden">
      <div className=" mt-5 md:mt-10 relative flex justify-between items-center">
        <ReviewBackground/>
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-robotoSerif text-center xxs:text-[16px] text-[20px] font-bold xl:font-bold text-primary-foreground max-sm:px-6 w-full ">
          Dubai Homeowners Have Crowned Us With Their Trust!
        </p>
      </div>
      </div>
      
       <div className="hidden sm:block">
      <div className=" mt-5 md:mt-10 relative">
        <ReviewBackgrounddashktop />
        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-robotoSerif text-center sm:text-[19px] md:text-24 xl:text-32 font-bold xl:font-bold text-primary-foreground max-sm:px-6 w-full ">
          Dubai Homeowners Have Crowned Us With Their Trust!
        </p>
      </div>
      </div>
    </div>
  );
}