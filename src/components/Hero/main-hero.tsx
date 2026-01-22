"use client";
import Container from "components/Res-usable/Container/Container";
import Link from "next/link";
import Image from "next/image";

const MainHero = () => {
  return (
    <section className="relative w-full h-auto py-8 xss:py-16 md:py-0 aspect-[16/8] overflow-hidden">
      <picture className="absolute inset-0 -z-10">
        <Image
          src="/assets/images/hero_image.webp"
          alt="Modern Blinds and Curtains"
          typeof="image/webp"
          fill
          priority
          fetchPriority="high"
          className="aspect-video"
          sizes="100vw"
        />
      </picture>
        <Container className="relative h-full flex items-center justify-center mt-20 xss:mt-28 sm:mt-20 lg:mt-28 xl:mt-36 text-white z-20">
            <Link
              href="/request-appointment/"
              className="bg-secondary text-primary font-semibold text-xs sm:text-sm lg:text-lg py-1 sm:py-2 lg:py-4 px-2 sm:px-4 lg:px-6 rounded-sm lg:rounded-md w-fit transition-opacity hover:opacity-80 animate-fadeUp"
            >
              Book A Free Visit
            </Link>
        </Container>
    </section>
  );
};

export default MainHero;
