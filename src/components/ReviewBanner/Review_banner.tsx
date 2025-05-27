
import Container from "components/Res-usable/Container/Container";
import { ReviewBackground, ReviewBackgrounddashktop } from "components/svg/review-background";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";

export default function ReviewBanner() {

  
  return (
    <div className="pt-5 lg:pt-10 bg-secondary-foreground">
      <Container className="grid grid-cols-1 md:grid-cols-2">
      <div className="md:max-w-screen-xs flex flex-col md:flex-row gap-6 items-center md:items-start relative mt-2">
        <Image src={"/assets/images/logo-review.png"} className="relative top-0 left-0 hidden md:block" width={100} height={40} alt="logo"/>
        <div className="space-y-3 text-center">
        <Image src={"/assets/images/googleReview/google.png"} width={235} height={34} alt="logo"/>
        <div className="flex  justify-center items-center">
          {Array(5).fill(null).map((star) => (
            <MdOutlineStarPurple500 key={star} className="text-[#FFD800] text-36" />
          ))}
        </div>
        <p className="font-roboto text-lg  md:text-xl">Rating <span className="font-medium">4.9 | 760</span> reviews <br/> Window treatment store</p>
        </div>
      </div>
       <div className="space-y-3 text-center md:text-start mt-5 md:mt-0">
        <p className="font-bold font-robotoSerif text-lg md:text-2xl text-primary ">Imran Ahmad</p>
        <p className=" sm:font-medium font-roboto text-lg md:text-xl text-primary px-6 sm:px-0 leading-7 ">“ Amazing experience from start to finish Ryan and Ben did a great job with installation leaving drive and garage clean ”</p>
        <Link target="_blank" href={"https://www.google.com/maps/place/Blinds+And+Curtains+Dubai/@25.1177148,55.2356858,984m/data=!3m1!1e3!4m8!3m7!1s0x3e5f698d0b075de1:0x223e3563a8be56be!8m2!3d25.1177148!4d55.2356858!9m1!1b1!16s%2Fg%2F11bbt9c0yz?entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D"} className="border border-primary py-2 px-4 rounded-md font-roboto font-bold text-22 hidden md:block w-fit">Go to Google Reviews</Link>
      </div>
      </Container>
     <div className=" mt-5 md:mt-10 relative ">
  <ReviewBackground className="block md:hidden" />
  <ReviewBackgrounddashktop className="hidden md:block"/>
  <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-robotoSerif text-center text-sm md:text-24 xl:text-32 font-bold xl:font-bold text-primary-foreground max-sm:px-6 w-full ">
    Dubai Homeowners Have Crowned Us With Their Trust!
  </p>
</div>
    </div>
  );
}