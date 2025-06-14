import { WhatsAppInfo } from 'data/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import whatsapp from "../../../public/assets/images/whatsapp.webp"

const WhatsIcon = () => {
  return (
    <Link
      href={`https://wa.me/${WhatsAppInfo.number.replaceAll(' ', '')}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed sm:bottom-2 bottom-4 right-1 z-50">
      <div className='relative size-14 xs:size-14'>
      <Image priority fill className='' src={whatsapp} alt='whatsapp'/>
      </div>
    </Link>
  );
};

export default WhatsIcon;
