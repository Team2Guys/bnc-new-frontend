'use client';

import React, { useEffect, useState } from 'react';
import {
  footerInfo,
  generateSlug,
  footerData,
  EmailInfo,
  phoneNumberInfo,
  WhatsAppInfo,
} from 'data/data';
import { IoLocationOutline } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';
import { ICategory, IProduct } from 'types/types';
import { useQuery } from '@tanstack/react-query';
import {
  fetchCategories,
  fetchProducts,
  fetchSubCategories,
} from 'config/fetch';
import { ChangedProductUrl_handler, predefinedPaths, urls } from 'data/urls';
import { Skeleton } from 'components/ui/skeleton';
import { Collapse } from 'antd';
import downIcon from '../../../../public/assets/images/icon/Vector@2x.png';
import { TCategorySection } from 'types/footer';
import Container from '../Container/Container';
import { TfiEmail } from 'react-icons/tfi';
import { LuPhone } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa';
import { SlCalender } from 'react-icons/sl';
import { usePathname } from 'next/navigation';
import SocialLink from '../social-link/social-link';



const Footer: React.FC = () => {
  const fetchAllData = async () => {
    const [products, categories, subcategories] = await Promise.all([
      fetchProducts(),
      fetchCategories(),
      fetchSubCategories(),
    ]);
    return { products, categories, subcategories };
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['allData'],
    queryFn: fetchAllData,

  });
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname()
  const products: IProduct[] = data?.products || [];
  const categories: ICategory[] = data?.categories || [];
  const subcategories = data?.subcategories || [];
  const [isMobile, setIsMobile] = useState(false);
  const generatePath = (product: IProduct, parent: string) => {
    const slug = ChangedProductUrl_handler(product.title);
    const basePath = product.href
      ? `${window.origin}/${product.href}`
      : `/${slug}`;

    return (
      predefinedPaths[slug as keyof typeof predefinedPaths] ||
      (slug === 'hotels-restaurants-blinds-curtains'
        ? basePath
        : `/${parent === 'shutters' ? `${parent}-range` : parent}${[
          'dimout-roller-blinds',
          'sunscreen-roller-blinds',
          'blackout-roller-blinds',
        ].includes(slug)
          ? '/roller-blinds'
          : ''
        }/${slug}`)
    );
  };
  const ChangedProductUrl = (title: string): string => {
    let products = urls.find((url: { productName: string; Url: string }) => {
      return url.productName === title;
    });

    return products ? products.Url : generateSlug(title);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const locations = ["Dubai", "Abu Dhabi", "Ajman", "Sharjah"];

  return (
    <footer>
      <div className={`bg-[#F5F5F5] sm:pt-10 sm:pb-5 py-7 ${(pathname.replaceAll('/','') !== 'request-appointment') && (pathname.replaceAll('/','') !== 'estimator') ? 'mt-10' :''}`}>
        <Container>
          <div className="grid grid-cols-1 xs:grid-cols-2  md:grid-cols-4 lg:grid-cols-5 gap-2 md:justify-items-center">
            <div className="mb-4 flex flex-col items-start">
              <Link href='/' className="w-[79px] h-[50px] relative md:w-[120px] md:h-[70px]">
              <Image
                fill
                loading='lazy'
                src='/assets/images/logomain.webp'
                alt="Logo"
              />
            </Link>
              <p className="text-base sm:text-sm text-start max-w-80 text-primary font-roboto mt-2 opacity-60">
                Most trusted window treatment company in Dubai with a decade of experience.
              </p>
              <ul className="space-y-2 mt-2 text-sm lg:w-[100%] text-primary ">
                <li className="flex gap-2 flex-nowrap items-center">
                  <span>
                    <TfiEmail size={18} className="text-secondary me-1 ms-[2px]" />
                  </span>
                  <Link
                    href={`mailto:${EmailInfo.email}`}
                    target="_blank"
                    className="text-base sm:text-sm text-wrap break-all "
                    aria-label='email'
                  >
                    {EmailInfo.email}
                  </Link>
                </li>
                <li className="flex gap-2 flex-nowrap items-center">
                  <span>
                    <LuPhone size={20} className="text-secondary me-1 ms-[2px]" />
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
                    <FaWhatsapp size={20} className="text-secondary me-1 ms-[2px]" />
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
                    <SlCalender size={19} className="text-secondary me-1 ms-[2px]" />
                  </span>
                  <p className='text-base sm:text-sm '>8.30am - 6.00pm 7 days a week</p>

                </li>

                <li className="flex gap-2 flex-nowrap">
                  <span>
                    <IoLocationOutline size={22} className="text-secondary me-1 ms-[2px]" />
                  </span>
                  <Link
                    target="_blank"
                    className="text-base sm:text-sm "
                    aria-label="Address"
                    href={
                      'https://www.google.com/maps/place/Two+Guys+-+Blinds+%26+Curtains+Dubai/@25.1177196,55.2331055,17z/data=!3m1!4b1!4m6!3m5!1s0x3e5f698d0b075de1:0x223e3563a8be56be!8m2!3d25.1177148!4d55.2356858!16s%2Fg%2F11bbt9c0yz?entry=tts&g_ep=EgoyMDI0MDkxOC4xKgBIAVAD'
                    }
                  >
                    Unit 43 22nd St – Al Quoz Industrial Area 4 – Dubai
                    UAE
                  </Link>
                </li>
              </ul>
              {/* <h4 className='text-base mt-4 font-bold text-primary font-roboto'>Follow Us</h4>
              <div className="flex items-center space-x-4 mt-4">
                <Link
                  target="_blank"
                  href={'https://www.facebook.com/blindsandcurtainsdubai'}
                  aria-label="facebook"

                >
                  <CiFacebook className="w-9 h-9 text-secondary" />
                </Link>
                <Link
                  target="_blank"
                  href={'https://www.pinterest.com/blindsandcurtainsdubai/'}
                  aria-label="pinterest"

                ><span className='w-8 h-8 rounded-full border-2 border-secondary flex justify-center items-center'>
                    <IoLogoPinterest className="w-6 h-6 rounded-full text-secondary" />
                  </span>
                </Link>
                <Link
                  target="_blank"
                  href={'https://www.instagram.com/blindsandcurtainsdubai/'}
                  aria-label="instagram"

                >
                  <AiOutlineInstagram className="w-9 h-9 text-secondary" />
                </Link>
              </div> */}
            </div>
            {isLoading || isError ? (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div className='flex flex-col sm:gap-4' key={index}>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="w-1/2 h-6 bg-black/25"
                      />
                    ))}
                  </div>
                ))}
              </>
            ) :


              (footerData.map((category: TCategorySection) => (
                <div className="2xl:pl-2" key={category.key}>
                  {
                    isMobile ? (
                      <Collapse 
                        bordered={false}
                        expandIcon={({ isActive }) =>
                          isActive ? (
                            <Image
                              src={downIcon}
                              alt="up icon"
                              width={14}
                              height={14}
                              className="pt-1 transform rotate-180 opacity-60"
                            />
                          ) : (
                            <Image
                              src={downIcon}
                              alt="down icon"
                              width={14}
                              height={14}
                              className="pt-1 opacity-60"
                            />
                          )
                        }
                        className="custom-collapse bg-transparent border-0 flex flex-col gap-1"
                        items={[
                          {
                            key: category.key || category.title,
                            label: (
                              <span className="sm:font-semibold font-medium text-18 text-primary font-robotoSerif">
                                {category.title}
                              </span>
                            ),
                            children: (
                              <ul className="space-y-2 my-4 font-roboto">
                                {(
                                  //@ts-ignore
                                  category?.items?.map((item, index: number) => {
                                    const matchingSubcategory = subcategories?.find(
                                      (subcategory: ICategory) =>
                                        subcategory.title === item &&
                                        subcategory.CategoryId ===
                                        categories.find(
                                          (cat) =>
                                            generateSlug(cat.title) ===
                                            generateSlug(category.title),
                                        )?.id,
                                    );

                                    const matchingProduct = products?.find(
                                      (product) =>
                                        product.title === item &&
                                        product.CategoryId ===
                                        categories.find(
                                          (cat) => cat.title === category.title,
                                        )?.id,
                                    );

                                    return (
                                      <React.Fragment key={index}>
                                        {matchingSubcategory && (
                                          <li>
                                            <Link
                                              className="text-14 2xl:text-16 text-primary font-normal"
                                              href={`/${category.title
                                                .toLowerCase()
                                                .replace('shutters', 'shutters-range')}/${ChangedProductUrl(
                                                  matchingSubcategory.title,
                                                )}/`}
                                            >
                                              {matchingSubcategory.title}
                                            </Link>
                                          </li>
                                        )}

                                        {matchingProduct && (
                                          <li>
                                            <Link
                                              className=" text-14 2xl:text-16 text-primary font-normal"
                                              href={generatePath(
                                                matchingProduct,
                                                generateSlug(category.title),
                                              )}
                                            >
                                              {matchingProduct.title}
                                            </Link>
                                          </li>
                                        )}
                                      </React.Fragment>
                                    );
                                  })
                                )}
                              </ul>
                            ),
                            className: 'pt-[6px]',
                          },
                        ]}

                      />
                    )
                      : (
                        <div>
                          <h3 className="font-semibold text-20 mb-2 text-primary w-fit font-robotoSerif">
                            {category.title}
                          </h3>
                          <ul className="space-y-2 mt-4 text-primary font-roboto">

                            {
                              //@ts-ignore
                              category?.items?.map((item, index: number) => {
                                const matchingSubcategory = subcategories?.find(
                                  (subcategory: ICategory) =>
                                    subcategory.title === item &&
                                    subcategory.CategoryId ===
                                    categories.find(
                                      (cat) =>
                                        generateSlug(cat.title) ===
                                        generateSlug(category.title),
                                    )?.id,
                                );

                                const matchingProduct = products?.find(
                                  (product) =>
                                    product.title === item &&
                                    product.CategoryId ===
                                    categories.find(
                                      (cat) => cat.title === category.title,
                                    )?.id,
                                );


                                return (


                                  <React.Fragment key={index}>
                                    {matchingSubcategory && (
                                      <li>
                                        <Link
                                          className="text-12 sm:text-14 text-[#3E3F42] opacity-60"
                                          href={`/${category.title.toLowerCase().replace('shutters', 'shutters-range')}/${ChangedProductUrl(matchingSubcategory.title)}/`}

                                        >
                                          {matchingSubcategory.title}
                                        </Link>
                                      </li>
                                    )}

                                    {matchingProduct && (
                                      <li>
                                        <Link
                                          className="text-12 sm:text-14 text-[#3E3F42] opacity-60"
                                          href={generatePath(matchingProduct, generateSlug(category.title)) + "/"}
                                        >
                                          {matchingProduct.title}
                                        </Link>
                                      </li>
                                    )}
                                  </React.Fragment>
                                );
                              })}
                          </ul>
                        </div>
                      )}
                </div>
              ))
              )}

            <div className="flex flex-col gap-4 lg:pl-2 mt-0 sm:mt-4 lg:mt-0 col-auto md:col-span-1 lg:col-auto">
              <div className={`${isMobile ? 'flex flex-col gap-4' : 'pl-0 lg:mx-auto flex flex-col  gap-4'}`}>
                <div>
                  {isMobile ? (
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full flex items-center justify-between sm:font-semibold font-medium text-18 xs:text-20 text-primary font-robotoSerif focus:outline-none"
                    >
                      <span>Location We are In</span>
                      {isOpen ? (
                        <Image
                          src={downIcon}
                          alt="up icon"
                          width={14}
                          height={14}
                          className="pt-1 transform rotate-180 transition-transform duration-300 opacity-60"
                        />
                      ) : (
                        <Image
                          src={downIcon}
                          alt="down icon"
                          width={14}
                          height={14}
                          className="pt-1 transition-transform duration-300 opacity-60"
                        />
                      )}
                    </button>
                  ) : (
                    <h3 className="font-semibold text-18 xs:text-20 text-primary font-robotoSerif max-lg:whitespace-nowrap">
                      Location We are In
                    </h3>
                  )}
                </div>

                {(isMobile ? isOpen : true) && (
                  <div>
                    <ul className="text-primary grid grid-cols-1 gap-1 xl:gap-2 ">
                      {locations.map((city) => (
                        <li key={city} className="flex gap-2 flex-nowrap sm:px-0 px-3 ">
                          <IoLocationOutline size={20} className="text-secondary me-1" />
                          <p className="2xl:text-sm text-12 sm:text-14 text-[#3E3F42] opacity-60">{city}</p>
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
        <Container className='pb-4 md:pb-0'>
          <div className="border-t border-primary-300 py-3 text-center flex md:flex-row flex-col sm:justify-between justify-center items-center max-md:space-y-1 sm:gap-y-0 gap-y-2">
            <div className='flex items-center max-sm:justify-between gap-4 max-sm:w-full'>
              <Link href="/about-us/" className="text-14 lg:text-16 text-primary-foreground font-medium font-roboto">About Us</Link>
              <Link href="/blog/" className="text-14 lg:text-16 text-primary-foreground font-medium font-roboto">Blog</Link>
              <Link href="/faqs/" className="text-14 lg:text-16 text-primary-foreground font-medium font-roboto">Faqs</Link>
              <Link href="/estimator/" className="text-14 lg:text-16 text-primary-foreground font-medium font-roboto">Estimator</Link>
            </div>
            <p className="text-14 lg:text-16 text-primary-foreground font-medium font-roboto">{footerInfo}</p>
            <div className='flex gap-2 items-center'>
              <h4 className='text-14 lg:text-16 sm:font-bold font-semibold text-white font-roboto'>Follow Us</h4>
              <div className="flex items-center space-x-5 ">
                <SocialLink/>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
