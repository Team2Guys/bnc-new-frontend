'use client';
import React, { useEffect, useState } from 'react';
import {
  footerInfo,
  footerData,
  EmailInfo,
  phoneNumberInfo,
  WhatsAppInfo,
} from 'data/data';
import { IoLocationOutline } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from 'types/types';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from 'config/fetch';
import { Skeleton } from 'components/ui/skeleton';
import { TCategorySection } from 'types/footer';
import Container from '../Container/Container';
import { TfiEmail } from 'react-icons/tfi';
import { LuPhone } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa';
import { SlCalender } from 'react-icons/sl';
import { usePathname } from 'next/navigation';
import SocialLink from '../social-link/social-link';
import { IoIosArrowDown } from 'react-icons/io';
import Collapse from 'components/ui/Collapse';
import { getPath } from 'utils/helperFunctions';
const Footer = () => {
  const fetchAllData = async () => {
    const [products] = await Promise.all([fetchProducts()]);
    return { products };
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ['allData'],
    queryFn: fetchAllData,
  });
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const products: IProduct[] = data?.products || [];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const locations = ['Dubai', 'Abu Dhabi', 'Ajman', 'Sharjah'];

  return (
    <footer>
      <div
        className={`bg-[#F5F5F5] sm:pt-10 sm:pb-5 py-7 ${pathname.replaceAll('/', '') !== 'request-appointment' && pathname.replaceAll('/', '') !== 'estimator' ? 'mt-10' : ''}`}
      >
        <Container>
          <div className="grid grid-cols-1 xs:grid-cols-2  md:grid-cols-4 lg:grid-cols-5 gap-2 md:justify-items-center">
            <div className="mb-4 flex flex-col items-start">
              <Link
                href="/"
                className="h-[50px] relative w-[120px] md:h-[50px]"
              >
                <Image
                  fill
                  priority
                  src="/assets/images/logomain.webp"
                  alt="Logo"
                  sizes="(max-width: 768px) 79px, 120px"
                />
              </Link>
              <p className="text-base sm:text-sm text-start max-w-80 text-primary font-roboto mt-2 opacity-60">
                Most trusted window treatment company in Dubai with a decade of
                experience.
              </p>
              <ul className="space-y-2 mt-2 text-sm lg:w-[100%] text-primary ">
                <li className="flex gap-2 flex-nowrap items-center">
                  <span>
                    <TfiEmail
                      size={18}
                      className="text-secondary me-1 ms-[2px]"
                    />
                  </span>
                  <Link
                    href={`mailto:${EmailInfo.email}`}
                    target="_blank"
                    className="text-base sm:text-sm text-wrap break-all "
                    aria-label="email"
                  >
                    {EmailInfo.email}
                  </Link>
                </li>
                <li className="flex gap-2 flex-nowrap items-center">
                  <span>
                    <LuPhone
                      size={20}
                      className="text-secondary me-1 ms-[2px]"
                    />
                  </span>
                  <Link
                    href={`tel:${phoneNumberInfo.number.replaceAll(' ', '')}`}
                    aria-label="Call Phone Number"
                    target="_blank"
                    className="text-base sm:text-sm text-nowrap"
                  >
                    {phoneNumberInfo.number}
                  </Link>
                </li>
                <li className="flex gap-1 items-center flex-nowrap">
                  <span>
                    <FaWhatsapp
                      size={20}
                      className="text-secondary me-1 ms-[2px]"
                    />
                  </span>
                  <Link
                    href={`https://wa.me/${WhatsAppInfo.number.replaceAll(' ', '')}`}
                    target="_blank"
                    className="text-base sm:text-sm  text-nowrap"
                  >
                    {WhatsAppInfo.number}
                  </Link>
                </li>
                <li className="flex gap-2 items-center flex-nowrap">
                  <span>
                    <SlCalender
                      size={19}
                      className="text-secondary me-1 ms-[2px]"
                    />
                  </span>
                  <p className="text-base sm:text-sm ">
                    8.30am - 11.00pm 7 days a week
                  </p>
                </li>

                <li className="flex gap-2 flex-nowrap">
                  <span>
                    <IoLocationOutline
                      size={22}
                      className="text-secondary me-1 ms-[2px]"
                    />
                  </span>
                  <Link
                    target="_blank"
                    className="text-base sm:text-sm "
                    aria-label="Address"
                    href={
                      'https://www.google.com/maps/place/Two+Guys+-+Blinds+%26+Curtains+Dubai/@25.1177196,55.2331055,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f698d0b075de1:0x223e3563a8be56be!8m2!3d25.1177148!4d55.2356858!16s%2Fg%2F11bbt9c0yz?entry=tts&g_ep=EgoyMDI0MDkxOC4xKgBIAVAD'
                    }
                  >
                    Unit 43 22nd St – Al Quoz Industrial Area 4 – Dubai UAE
                  </Link>
                </li>
              </ul>
            </div>
            {isLoading || isError
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    className="flex flex-col gap-2 sm:gap-4 w-full xs:items-center"
                    key={index}
                  >
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Skeleton key={index} className="w-2/3 h-6 bg-black/25" />
                    ))}
                  </div>
                ))
              : footerData.map((array: TCategorySection, index) => (
                  <div className="2xl:pl-2" key={array.key || index}>
                    {isMobile ? (
                      <Collapse
                        className="bg-transparent border-0"
                        items={[
                          {
                            key: array.key || array.title,
                            label: array.title,
                            children: (
                              <ul className="space-y-2 font-roboto">
                                {array?.items?.map(
                                  (item: string, index: number) => {
                                    const product = products.find(
                                      (p) =>
                                        p.status === 'PUBLISHED' &&
                                        p.title.toLowerCase().trim() ===
                                          item.toLowerCase().trim(),
                                    );
                                    return (
                                      product && (
                                        <li
                                          key={index}
                                          className="text-sm 2xl:text-16 text-primary font-normal capitalize"
                                        >
                                          <Link href={getPath(product)}>
                                            {item}
                                          </Link>
                                        </li>
                                      )
                                    );
                                  },
                                )}
                              </ul>
                            ),
                          },
                        ]}
                      />
                    ) : (
                      <div>
                        <Link
                          href={array.link}
                          className="font-semibold text-xl mb-2 text-primary w-fit font-futura"
                        >
                          {array.title}
                        </Link>
                        <ul className="space-y-2 mt-4 text-primary font-roboto capitalize">
                          {array.items &&
                            array.items.map((item, index) => {
                              const product = products.find(
                                (p) =>
                                  p.status === 'PUBLISHED' &&
                                  p.title.toLowerCase().trim() ===
                                    item.toLowerCase().trim(),
                              );
                              return (
                                product && (
                                  <li
                                    key={index}
                                    className="text-xs sm:text-sm text-[#3E3F42] opacity-60 hover:opacity-100 transition"
                                  >
                                    <Link href={getPath(product)}>{item}</Link>
                                  </li>
                                )
                              );
                            })}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
            <div className="flex flex-col gap-4 lg:pl-2 mt-0 sm:mt-4 lg:mt-0 col-auto md:col-span-1 lg:col-auto">
              <div
                className={`${isMobile ? 'flex flex-col gap-4' : 'pl-0 lg:mx-auto flex flex-col  gap-4'}`}
              >
                <div>
                  {isMobile ? (
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full flex items-center justify-between sm:font-semibold font-medium text-18 xs:text-20 text-primary font-futura focus:outline-none"
                    >
                      <span>Location We are In</span>
                      <IoIosArrowDown
                        size={24}
                        className="pt-1 transform transition-transform duration-300 opacity-60"
                      />
                    </button>
                  ) : (
                    <h3 className="font-semibold text-18 xs:text-20 text-primary font-futura max-lg:whitespace-nowrap">
                      Location We are In
                    </h3>
                  )}
                </div>
                {(isMobile ? isOpen : true) && (
                  <div>
                    <ul className="text-primary grid grid-cols-1 gap-1 xl:gap-2 ">
                      {locations.map((city) => (
                        <li
                          key={city}
                          className="flex gap-2 flex-nowrap sm:px-0 px-3 "
                        >
                          <IoLocationOutline
                            size={20}
                            className="text-secondary me-1"
                          />
                          <p className="2xl:text-sm text-12 sm:text-sm text-[#3E3F42] opacity-60">
                            {city}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-primary">
        <Container className="pb-4 md:pb-0 border-t border-primary-300 py-3 space-y-3 sm:space-y-0">
          <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-y-2">
            <Link
              href="/product-guarantees/"
              className="text-sm lg:text-16 text-primary-foreground font-medium font-roboto border-r border-secondary px-2"
            >
              Product Guarantees
            </Link>
            <Link
              href="/blog/"
              className="text-sm lg:text-16 text-primary-foreground font-medium font-roboto border-r border-secondary px-2"
            >
              Blog
            </Link>
            <Link
              href="/projects/"
              className="text-sm lg:text-16 text-primary-foreground font-medium font-roboto border-r-0 xsm:border-r border-secondary px-2"
            >
              Our Projects
            </Link>
            <Link
              href="/contact-us/"
              className="text-sm lg:text-16 text-primary-foreground font-medium font-roboto border-r xsm:border-r-0 xs:border-r border-secondary px-2"
            >
              Contact Us
            </Link>
            <Link
              href="/gallery/"
              className="text-sm lg:text-16 text-primary-foreground font-medium font-roboto border-r border-secondary px-2"
            >
              Gallery
            </Link>
            <Link
              href="/why-choose-blinds-curtains/"
              className="text-sm lg:text-16 text-primary-foreground font-medium font-roboto px-2"
            >
              Why Choose Us
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 text-center sm:items-end gap-2 py-2">
            <p className="text-sm lg:text-16 text-primary-foreground font-medium font-roboto">
              {footerInfo}
            </p>
            <div className="flex gap-2 justify-center sm:justify-end items-center">
              <p className="text-sm lg:text-16 sm:font-bold font-semibold text-white font-roboto">
                Follow Us
              </p>
              <div className="flex items-center space-x-5 ">
                <SocialLink />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
