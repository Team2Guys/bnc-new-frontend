import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import phone from "../../../public/assets/images/phone.jpg"

const Callbutton = () => {
  return (
    <Link
      href="tel:042522025"
      target="_blank"
      rel="noopener noreferrer"
       aria-label="Call Phone Number"
      className="fixed sm:bottom-2 bottom-4 left-1 z-50 "
    >
      <div className='relative size-14'>
        <Image priority fill className='rounded-full' src={phone} alt='phone' />
      </div>
    </Link>
  )
}

export default Callbutton