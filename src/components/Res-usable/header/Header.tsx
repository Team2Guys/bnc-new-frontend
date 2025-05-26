
import { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar'
import { MdOutlineStarPurple500 } from 'react-icons/md';
import CustomModal from 'components/ui/Modal';
import { ratings } from 'data/new-data';
import StarRatingBar from 'components/Hero/StarRatingBar';
import Link from 'next/link';

const Header = () => {
   const [open, setOpen] = useState(false);
   
  const trustIndexRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open && trustIndexRef.current) {
      trustIndexRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = 'https://cdn.trustindex.io/loader.js?6754fb44611899190046bf90da7';
      script.async = true;
      trustIndexRef.current.appendChild(script);
    }
  }, [open]);
  return (
    <>
    <Navbar />
          <div
        className="fixed bottom-96 md:bottom-64 right-0 flex items-center bg-primary p-2 md:p-4 flex-col justify-center z-50 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <div className="flex flex-col justify-center items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <MdOutlineStarPurple500
              key={star}
              className="text-[#FFD800] text-lg md:text-27"
            />
          ))}
        </div>
        <span className="text-base md:text-[22px] font-bold text-primary-foreground">
          4.9
        </span>
      </div>
         <CustomModal open={open} onClose={() => setOpen(false)} title={<>
         <div className="flex justify-between items-center flex-col space-y-2">
          <p className="font-bold font-robotoSerif text-xl">Let customers speak for us</p>
          <div className="flex  justify-center items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <MdOutlineStarPurple500 key={star} className="text-[#FFD800] text-30" />
            ))}
          </div>
          <p className="font-roboto text-primary">Based on 800 reviews</p>
         </div>
         </>}>
           <div className="space-y-3 mt-5">
            <div className="mt-2 max-w-64 md:max-w-md mx-auto">
            {ratings.map((r) => (
              <StarRatingBar key={r.rating} rating={r.rating} percentage={r.percent} />
            ))}
           </div>
           <Link target="_blank" href="https://www.google.com/maps/place/Blinds+And+Curtains+Dubai/@25.1177148,55.2356858,984m/data=!3m1!1e3!4m8!3m7!1s0x3e5f698d0b075de1:0x223e3563a8be56be!8m2!3d25.1177148!4d55.2356858!9m1!1b1!16s%2Fg%2F11bbt9c0yz?entry=ttu&g_ep=EgoyMDI1MDUxMy4xIKXMDSoASAFQAw%3D%3D" className="bg-secondary text-primary font-semibold text-xl py-2 px-6 rounded-md w-fit block text-center mx-auto mt-8">Leave A Google Review</Link>

           <hr/>
           </div>
        <div ref={trustIndexRef} className="w-full h-[350px] lg:h-[500px] overflow-y-scroll p-6" />
      </CustomModal>
    </>
  )
}

export default Header