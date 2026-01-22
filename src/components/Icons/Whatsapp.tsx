import { WhatsAppInfo } from 'data/data';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import whatsapp from '../../../public/assets/images/whatsapp.webp';

const WhatsIcon = () => {
  return (
    <Link
      id="QAT-DIGITAL_WA"
      href={`https://wa.me/${WhatsAppInfo.number.replaceAll(' ', '')}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed sm:bottom-2 bottom-4 right-1 z-40"
    >
      <div className="relative size-14">
        <Image
          priority
          fill
          className="rounded-full"
          src={whatsapp}
          alt="whatsapp"
        />
      </div>
    </Link>
  );
};

export default WhatsIcon;
