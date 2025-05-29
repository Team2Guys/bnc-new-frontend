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
      className="fixed bottom-2 right-1 z-50">
      <Image priority width={60} height={60} className='size-12 xs:size-14' src={whatsapp} alt='whatsapp'/>
    </Link>
  );
};

export default WhatsIcon;
