"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "./Container/Container";
import { BreadcrumbProps } from "types/product";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Image from "next/image";

const Breadcrumb = ({
  title = "",
  slug = "",
  subcategory = "",
  className = "",
  categorylink, 
  image,
  bradcrumbtitle,
  imageclassName,
}: BreadcrumbProps & { className?: string, imageclassName?: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 5);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const arrow = (
    <MdOutlineArrowForwardIos className="text-primary text-xs sm:text-base" />

  );
  
  return (
    <>

    <div
      className={`z-40 w-full p-2 bg-white text-start   ${
        isScrolled ? "fixed left-0 top-[60px] sm:top-[92px]" : "relative"
      } ${className}`}
    >
      <Container className="flex flex-wrap items-center gap-1 sm:gap-2">
        <Link href="/" className="capitalize text-primary font-medium text-xs sm:text-base">
          Home
        </Link>

        {slug && (
          <>
            {arrow}
          <Link  href={`/${categorylink || slug}`}
              className="capitalize text-primary font-roboto font-medium text-xs sm:text-base"
            >
              {slug.replace(/-/g, " ")}
            </Link>
          </>
        )}

        {subcategory && (
          <>
            {arrow}
            {title ? (
              <Link
                 href={
            `/${categorylink || slug}/${subcategory}`
                  }
                className="capitalize text-primary font-roboto font-medium text-xs sm:text-base"
              >
                {subcategory.replace(/-/g, " ")}
              </Link>
            ) : (
              <span className="capitalize font-bold text-primary font-roboto text-xs sm:text-base">
                {subcategory.replace(/-/g, " ")}
              </span>
            )}
          </>
        )}

        {title && (
          <>
            {arrow}
            <span className="font-semibold capitalize text-primary font-roboto text-xs sm:text-base">
              {bradcrumbtitle || title.replace(/-/g, " ")}
            </span>
          </>
        )}
      </Container>
    </div>
    {
      image &&
        <div className="relative w-full h-32 md:h-56 lg:h-[450px] flex items-center justify-center text-center overflow-hidden max-w-screen-xxl mx-auto">
        <Image
               src={image}
               alt={title}
               fill
               className={`z-0 brightness-50 object-cover ${imageclassName ? imageclassName : "object-bottom"}`}
               priority
             />
             <h1 className="px-2 relative z-10 text-white text-2xl md:text-4xl font-futura xl:text-8xl font-semibold md:font-extrabold capitalize xl:w-1/2">
               {title}
             </h1>
           </div>
    }
        </>
  );
};

export default Breadcrumb;
