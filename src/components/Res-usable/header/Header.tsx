"use client";
import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { ratings } from "data/new-data";
import StarRatingBar from "components/Hero/StarRatingBar";
import Link from "next/link";
import { IREVIEWS } from "types/general";
import { fetchReviews } from "config/fetch";
const CustomModal = dynamic(() => import("components/ui/Modal"), {
  loading: () => <p>Loading...</p>,
});
const TestimonialCard = dynamic(() => import("../Cards/TestimonialCard"));

const Header = () => {
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState<IREVIEWS[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (open && reviews.length === 0) {
      fetchReviews().then(setReviews);
    }
  }, [open, reviews.length]);
  const visibleReviews = showAll ? reviews : reviews.slice(0, 4);

  const handleModalOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <>
      <Navbar />
      <div
        className="fixed bottom-96 md:bottom-64 right-0 flex items-center bg-primary p-2 md:p-4 flex-col justify-center z-50 cursor-pointer"
        onClick={handleModalOpen}
      >
        <div className="flex flex-col justify-center items-center">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <MdOutlineStarPurple500
                key={index}
                className="text-[#FFD800] text-lg md:text-27"
              />
            ))}
        </div>
        <span className="text-base md:text-[22px] font-bold text-primary-foreground">
          4.9
        </span>
      </div>

      <CustomModal open={open} onClose={handleModalClose} title={
        <div className="flex justify-between items-center flex-col space-y-2">
          <p className="font-bold font-robotoSerif text-xl">
            Let customers speak for us
          </p>
          <div className="flex justify-center items-center">
            {Array.from({ length: 5 }, (_, index) => (
              <MdOutlineStarPurple500
                key={index}
                className="text-[#FFD800] text-30"
              />
            ))}
          </div>
          <p className="font-roboto text-primary">Based on 800 reviews</p>
        </div>
      }>
        <div className="space-y-3 mt-5">
          <div className="mt-2 max-w-64 md:max-w-md mx-auto">
            {ratings && ratings.map((r) => (
              <StarRatingBar
                key={r.rating}
                rating={r.rating}
                percentage={r.percent}
              />
            ))}
          </div>

          <Link
            target="_blank"
            href="https://www.google.com/maps/place/Blinds+And+Curtains+Dubai/@25.1177148,55.2356858,984m/data=!3m1!1e3!4m8!3m7!1s0x3e5f698d0b075de1:0x223e3563a8be56be!8m2!3d25.1177148!4d55.2356858!9m1!1b1!16s%2Fg%2F11bbt9c0yz?entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D"
            className="bg-secondary text-primary font-semibold text-xl py-2 px-6 rounded-md w-fit block text-center mx-auto mt-8"
          >
            Leave A Google Review
          </Link>

          <hr />
        </div>

        <div className="w-full max-h-[30vh] xsm:max-h-[40vh] xs:max-h-[350px] lg:max-h-[500px] overflow-y-scroll p-4 xsm:p-6 grid grid-cols-1 xs:grid-cols-2 gap-0 xs:gap-4">
          {visibleReviews && visibleReviews.map((item, index) => (
            <TestimonialCard key={index} testimonial={item} />
          ))}
        </div>

        {reviews.length > 4 && (
          <div className="text-center py-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-primary font-semibold  bg-[#f1b42f] px-3 py-2 rounded "
            >
              {showAll ? 'Show Less' : 'View More'}
            </button>
          </div>
        )}
      </CustomModal>
    </>
  );
};

export default Header;
