import Link from 'next/link';
import React from 'react';
import { ReactNode } from 'react';
import { FaInstagram, FaPinterest } from 'react-icons/fa';
import { FaSnapchat, FaThreads, FaTiktok, FaYoutube } from 'react-icons/fa6';
import { RiFacebookFill } from 'react-icons/ri';

interface SocialDataType {
  href: string;
  icon: ReactNode;
  alt: string;
  plateform?: string;
}

const SocialData: SocialDataType[] = [
  {
    href: 'https://www.facebook.com/blindsandcurtainsdubai',
    icon: <RiFacebookFill className="size-6" />,
    alt: 'Facebook',
    plateform: 'Facebook',
  },
  {
    href: 'https://www.instagram.com/blindsandcurtainsdubai/',
    icon: <FaInstagram className="size-6 ps-[1px]" />,
    alt: 'Instagram',
    plateform: 'Instagram',
  },
  {
    href: 'https://www.threads.com/@blindsandcurtainsdubai',
    icon: <FaThreads className="size-6 ps-[1px]" />,
    alt: 'Threads',
    plateform: 'Threads',
  },
   {
    href: 'https://www.youtube.com/@blindsandcurtainsdubai',
    icon: <FaYoutube className="size-6 ps-[1px]" />,
    alt: 'Youtube',
    plateform: 'Youtube',
  },
   {
    href: 'https://www.tiktok.com/@blindsandcurtainsdubai1',
    icon: <FaTiktok className="size-6 ps-[1px]" />,
    alt: 'Tiktok',
    plateform: 'Tiktok',
  },
  {
    href: 'https://www.pinterest.com/blindsandcurtainsdubai/',
    icon: <FaPinterest className="size-6" />,
    alt: 'Pinterest',
    plateform: 'Pinterest',
  },
  {
    href: 'https://www.snapchat.com/@blinds_curtains?share_id=MqVFe-mTvxY&locale=en-PK',
    icon: <FaSnapchat className="size-6" />,
    alt: 'Snapchat',
    plateform: 'Snapchat',
  },
];

const SocialLink: React.FC = () => {
  return (
    <div className="flex gap-3 items-center text-white">
      {SocialData.map((social, index) => (
        <Link
          key={index}
          href={social.href}
          target="_blank"
          aria-label={`Visit our ${social.plateform} page`}
        >
          <div className="flex justify-center items-center rounded-full h-[16px] w-[16px] md:size-8 text-secondary border border-secondary">
            {social.icon}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SocialLink;
