'use client';

import Container from 'components/Res-usable/Container/Container';
import { BlogInfo } from 'types/interfaces';
import { useRouter } from 'next/navigation';
import { generateSlug } from 'data/data';
import Link from 'next/link';
import { formatDateMonth } from 'config';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SampleNextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="absolute -top-3 sm:-top-7 !right-3 cursor-pointer z-10"
      onClick={onClick}
    >
      <FaChevronRight className="text-black text-sm sm:text-xl" />
    </div>
  );
}

function SamplePrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <div
      className="absolute -top-3 sm:-top-7 left-auto !right-8 cursor-pointer z-10"
      onClick={onClick}
    >
      <FaChevronLeft className="text-black text-sm sm:text-xl" />
    </div>
  );
}

const PopularBlog = ({ blogs }: { blogs: BlogInfo[] }) => {
  const route = useRouter();
  const settings = {
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 300,
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1.5 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2.5 },
      },
      {
        breakpoint: 880,
        settings: { slidesToShow: 2.8 },
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
    ],
  };

  return (
    <Container className="mt-1 px-2">
      <div className="flex items-center gap-2 border-t border-gray-300 pt-6">
        <h3 className="text-10 sm:text-28 font-semibold">Popular Posts</h3>
        <span className="border-t border-gray-300 grow me-16 mt-1"></span>
      </div>

      <div className="slider-container relative">
        <Slider {...settings}>
          {blogs &&
            blogs.map((blog, index) => (
              <div key={index} className="px-2">
                <Link
                  className="rounded-lg mt-5 px-4 flex flex-col justify-between w-full"
                  href={`/blog/${
                    blog.redirectionUrl
                      ? blog.redirectionUrl
                      : generateSlug(blog.title)
                  }/`}
                >
                  <div>
                    <Image
                      className="rounded-md sm:rounded-3xl h-[140px] sm:h-[353.9px] w-full cursor-pointer"
                      width={700}
                      height={700}
                      src={blog.posterImage?.imageUrl}
                      alt="blog"
                    />
                    <span className="text-12 font-medium text-[#999999]">
                      {formatDateMonth(blog.createdAt)}
                    </span>
                    <h3
                      className="text-12 md:text-16 lg:text-18 xl:text-20 font-bold cursor-pointer text-start h-14 xs:h-16 sm:h-12 md:h-20 lg:h-24 xl:h-24 2xl:h-16"
                      onClick={() => {
                        route.push(
                          `/blog/${
                            blog.redirectionUrl
                              ? blog.redirectionUrl
                              : generateSlug(blog.title)
                          }`
                        );
                      }}
                    >
                      {blog.title?.slice(0, 70) + '..'}
                    </h3>
                  </div>
                  <p className="text-10 md:text-14 xl:text-16 md:hidden">
                    {blog.Meta_description?.slice(0, 60) + '..'}
                  </p>
                  <p className="text-10 md:text-14 xl:text-16 hidden md:block lg:hidden">
                    {blog.Meta_description?.slice(0, 45) + '..'}
                  </p>
                  <p className="text-10 md:text-14 xl:text-16 hidden lg:block 2xl:hidden">
                    {blog.Meta_description?.slice(0, 55) + '..'}
                  </p>
                  <p className="text-10 md:text-14 xl:text-16 hidden 2xl:block">
                    {blog.Meta_description?.slice(0, 90) + '..'}
                  </p>
                  <div>
                    <Link
                      href={`/blog/${
                        blog.redirectionUrl
                          ? blog.redirectionUrl
                          : generateSlug(blog.title)
                      }/`}
                      className="text-primary text-12 sm:text-18 underline font-bold text-center sm:text-start"
                    >
                      Read More
                    </Link>
                  </div>
                </Link>
              </div>
            ))}
        </Slider>
      </div>
    </Container>
  );
};

export default PopularBlog;
