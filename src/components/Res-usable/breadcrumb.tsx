"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "./Container/Container";
import { BreadcrumbProps } from "types/product";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const Breadcrumb = ({
  title = "",
  slug = "",
  subcategory = "",
  className = "",
  categorylink, 
}: BreadcrumbProps & { className?: string }) => {
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
    <MdOutlineArrowForwardIos className="text-primary" />

  );
  
  return (
    <div
      className={`z-40 w-full p-2 bg-white  ${
        isScrolled ? "fixed top-[60px] sm:top-[92px]" : "relative  "
      } ${className}`}
    >
      <Container className=" flex items-center gap-2">
        <Link href="/" className="capitalize text-[#3E3F4280]">
          Home
        </Link>

        {slug && (
          <>
            {arrow}
          <Link  href={`/${categorylink || slug}`}
              className="capitalize text-primary font-roboto text-16 sm:text-base"
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
                className="capitalize text-primary font-roboto text-xs sm:text-base"
              >
                {subcategory.replace(/-/g, " ")}
              </Link>
            ) : (
              <span className="capitalize  font-bold text-primary font-roboto text-16 sm:text-base">
                {subcategory.replace(/-/g, " ")}
              </span>
            )}
          </>
        )}

        {title && (
          <>
            {arrow}
            <span className=" font-medium capitalize text-primary font-roboto text-16 sm:text-base">
              {title.replace(/-/g, " ")}
            </span>
          </>
        )}
      </Container>
    </div>
  );
};

export default Breadcrumb;
