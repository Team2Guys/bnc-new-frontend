"use client";
import Container from "components/Res-usable/Container/Container";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const MainHero = () => {
 
  return (
    <div className="relative w-full h-[295px] md:h-[75vh] overflow-hidden">
      <Image src={"https://res.cloudinary.com/de6owjeap/image/upload/v1748864684/WhatsApp_Image_2025-06-02_at_16.27.26_hz9xa8.jpg"} className="absolute top-0 left-0 w-full h-full object-cover object-center"
      loading="eager" fill alt="Hero Banner"/>
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25" />
      {/* Content */}
      <Container className="relative h-full flex flex-col justify-between text-primary-foreground">
        <div className="flex flex-col items-start h-full max-w-72 md:max-w-2xl space-y-2 md:space-y-5 justify-center">
          <h1 className="text-2xl md:text-5xl font-extrabold font-robotoSerif">
            Blinds and Curtains
          </h1>
          <p className="text-19 md:text-2xl  font-roboto md:font-medium text-primary-foreground text-start">
            Your Space, Our Modern Window Solutions.
          </p>
          <Link href="/request-appointment/" className="bg-secondary text-primary font-semibold text-14 md:text-xl py-2 md:py-4 px-4 sm:px-6 rounded-md w-fit hover:opacity-65">
            Book A Free Visit
          </Link>
        </div>
      </Container>

    </div>
  );
};

export default MainHero;